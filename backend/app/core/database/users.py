from typing import Optional, List
from datetime import datetime
from app.models.database.user import User, UserCreate, UserUpdate, UserInDB, UserRole, UserStatus
from app.core.security.security import get_password_hash, verify_password

# In-memory user storage for development
# In production, this would be replaced with a real database
users_db: List[UserInDB] = []

def get_user_by_id(user_id: int) -> Optional[UserInDB]:
    """Get user by ID"""
    for user in users_db:
        if user.id == user_id:
            return user
    return None

def get_user_by_email(email: str) -> Optional[UserInDB]:
    """Get user by email"""
    for user in users_db:
        if user.email == email:
            return user
    return None

def get_user_by_username(username: str) -> Optional[UserInDB]:
    """Get user by username"""
    for user in users_db:
        if user.username == username:
            return user
    return None

def get_users(skip: int = 0, limit: int = 100) -> List[UserInDB]:
    """Get all users with pagination"""
    return users_db[skip : skip + limit]

def create_user(user: UserCreate) -> UserInDB:
    """Create a new user"""
    # Check if user already exists
    if get_user_by_email(user.email):
        raise ValueError("Email already registered")
    if get_user_by_username(user.username):
        raise ValueError("Username already taken")
    
    # Create new user
    user_id = len(users_db) + 1
    hashed_password = get_password_hash(user.password)
    now = datetime.utcnow()
    
    db_user = UserInDB(
        id=user_id,
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        role=user.role,
        status=user.status,
        hashed_password=hashed_password,
        created_at=now,
        updated_at=now,
        last_login=None
    )
    
    users_db.append(db_user)
    return db_user

def update_user(user_id: int, user_update: UserUpdate) -> Optional[UserInDB]:
    """Update user information"""
    user = get_user_by_id(user_id)
    if not user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    user.updated_at = datetime.utcnow()
    return user

def update_user_last_login(user_id: int) -> Optional[UserInDB]:
    """Update user's last login time"""
    user = get_user_by_id(user_id)
    if not user:
        return None
    
    user.last_login = datetime.utcnow()
    return user

def delete_user(user_id: int) -> bool:
    """Delete a user"""
    user = get_user_by_id(user_id)
    if not user:
        return False
    
    users_db.remove(user)
    return True

def authenticate_user(username: str, password: str) -> Optional[UserInDB]:
    """Authenticate user with username and password"""
    user = get_user_by_username(username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    if user.status != UserStatus.ACTIVE:
        return None
    return user

def is_active_user(user: UserInDB) -> bool:
    """Check if user is active"""
    return user.status == UserStatus.ACTIVE

def is_admin_user(user: UserInDB) -> bool:
    """Check if user is admin"""
    return user.role == UserRole.ADMIN

# Initialize with some test users
def init_test_users():
    """Initialize test users for development"""
    if not users_db:  # Only initialize if no users exist
        test_users = [
            UserCreate(
                email="admin@example.com",
                username="admin",
                password="admin123",
                full_name="Administrator",
                role=UserRole.ADMIN
            ),
            UserCreate(
                email="user@example.com",
                username="user",
                password="user123",
                full_name="Test User",
                role=UserRole.USER
            ),
            UserCreate(
                email="guest@example.com",
                username="guest",
                password="guest123",
                full_name="Guest User",
                role=UserRole.GUEST
            )
        ]
        
        for user_data in test_users:
            try:
                create_user(user_data)
            except ValueError:
                pass  # User already exists
