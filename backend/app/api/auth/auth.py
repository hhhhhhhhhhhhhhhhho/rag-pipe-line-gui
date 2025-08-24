from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security.security import (
    create_access_token,
    create_refresh_token,
    get_current_active_user,
    get_current_admin_user,
)
from app.core.database.users import get_user_by_id, init_test_users, authenticate_user, update_user_last_login
from app.models.api.auth import Token, LoginRequest
from app.models.database.user import User

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    """
    Login endpoint for user authentication
    """
    user = authenticate_user(login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login time
    update_user_last_login(user.id)
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": user.id},
        expires_delta=access_token_expires
    )
    
    # Create refresh token
    refresh_token = create_refresh_token(
        data={"sub": user.username, "user_id": user.id}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 1800,  # 30 minutes in seconds
        "refresh_token": refresh_token
    }

@router.post("/login/form", response_model=Token)
async def login_form(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Login endpoint using OAuth2 form (for Swagger UI compatibility)
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login time
    update_user_last_login(user.id)
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": user.id},
        expires_delta=access_token_expires
    )
    
    # Create refresh token
    refresh_token = create_refresh_token(
        data={"sub": user.username, "user_id": user.id}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 1800,  # 30 minutes in seconds
        "refresh_token": refresh_token
    }

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    """
    Get current user information
    """
    return current_user

@router.get("/admin")
async def admin_only(current_user: User = Depends(get_current_admin_user)):
    """
    Admin-only endpoint
    """
    return {"message": "Hello admin!", "user": current_user.username}

@router.post("/init-test-users")
async def initialize_test_users():
    """
    Initialize test users (development only)
    """
    init_test_users()
    return {"message": "Test users initialized successfully"}

@router.get("/users")
async def get_users(current_user: User = Depends(get_current_admin_user)):
    """
    Get all users (admin only)
    """
    from app.core.database.users import get_users as get_all_users
    users = get_all_users()
    return {"users": users}
