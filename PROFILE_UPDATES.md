# Profile Page Updates - Frontend Integration

## Overview
The Profile page has been completely updated to integrate with the secure backend API and support both Arabic and English languages.

## Key Changes Made

### 1. **Data Structure Integration**
- Updated `userData` state to match the API response structure
- Added proper initialization from `currentUser` data
- Handles all fields from the backend response including:
  - Basic info: firstName, lastName, email, phone, country
  - Additional fields: birthDate, address, bio, avatar
  - Security settings: profileVisibility, twoFactorEnabled
  - Privacy settings: dataProcessingConsent, marketingConsent

### 2. **Bilingual Support (Arabic/English)**
- All UI text now supports both languages using `{lang === "ar" ? "Arabic" : "English"}` pattern
- Form labels, buttons, messages, and placeholders are bilingual
- Maintains RTL support for Arabic text

### 3. **API Integration**
- **Save Changes**: Integrated with backend API endpoints
  - General profile: `PUT /api/user/profile`
  - Privacy settings: `PUT /api/user/privacy-settings`
- **Avatar Upload**: Integrated with `POST /api/user/upload-avatar`
- **Authentication**: Uses Bearer token from localStorage
- **Error Handling**: Comprehensive error handling with toast notifications

### 4. **Enhanced User Experience**
- **Loading States**: Shows loading spinner during save/upload operations
- **Success Feedback**: Green button with checkmark when save is successful
- **Toast Notifications**: Success/error messages in both languages
- **File Validation**: Validates image type (JPEG, PNG, WebP) and size (5MB max)
- **Preview**: Shows image preview before upload

## API Endpoints Used

### Profile Management
```javascript
// Update profile
PUT /api/user/profile
Headers: { Authorization: "Bearer <token>" }
Body: {
  firstName, lastName, email, phone, country,
  birthDate, address, bio, profileVisibility
}

// Update privacy settings  
PUT /api/user/privacy-settings
Headers: { Authorization: "Bearer <token>" }
Body: {
  profileVisibility, dataProcessingConsent, marketingConsent
}

// Upload avatar
POST /api/user/upload-avatar
Headers: { Authorization: "Bearer <token>" }
Body: FormData with 'avatar' file
```

## Form Fields Mapping

### From API Response to Form
```javascript
// API Response Structure
{
  "_id": "user_id",
  "firstName": "Ahmed",
  "lastName": "Soliman", 
  "email": "user@example.com",
  "phone": "+1234567890",
  "country": "Egypt",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "address": "User address",
  "bio": "User bio",
  "avatar": "https://avatar-url.com/image.jpg",
  "profileVisibility": "public",
  "twoFactorEnabled": false,
  "dataProcessingConsent": true,
  "marketingConsent": false,
  // ... other fields
}

// Form State Mapping
userData: {
  firstName: currentUser.firstName || "",
  lastName: currentUser.lastName || "",
  email: currentUser.email || "",
  phone: currentUser.phone || "",
  country: currentUser.country || "",
  birthDate: currentUser.birthDate?.split('T')[0] || "", // Convert to YYYY-MM-DD
  address: currentUser.address || "",
  bio: currentUser.bio || "",
  avatar: currentUser.avatar || "",
  profileVisibility: currentUser.profileVisibility || "public"
}
```

## Language Support Examples

### Form Labels
```javascript
// Before (Arabic only)
<label>الاسم الأول</label>

// After (Bilingual)
<label>{lang === "ar" ? "الاسم الأول" : "First Name"}</label>
```

### Button States
```javascript
// Save button with multiple states
{loading 
  ? (lang === "ar" ? "جاري الحفظ..." : "Saving...") 
  : saveSuccess 
  ? (lang === "ar" ? "تم الحفظ!" : "Saved!") 
  : (lang === "ar" ? "حفظ التغييرات" : "Save Changes")
}
```

### Toast Messages
```javascript
// Success message
toast.success(
  lang === "ar" 
    ? "تم حفظ التغييرات بنجاح" 
    : "Changes saved successfully"
);

// Error message
toast.error(
  lang === "ar" 
    ? "حدث خطأ أثناء حفظ التغييرات" 
    : "An error occurred while saving changes"
);
```

## File Upload Features

### Validation
- **File Types**: JPEG, JPG, PNG, WebP only
- **File Size**: Maximum 5MB
- **Error Messages**: Bilingual error messages for validation failures

### Upload Process
1. User selects file → Validation runs
2. If valid → Shows preview + uploads to server
3. Server responds → Updates userData.avatar with new URL
4. Success message → Clears preview (uses actual URL)

### Error Handling
- Network errors
- Authentication errors (token expired)
- File validation errors
- Server-side errors

## Security Features

### Token Management
- Retrieves access token from localStorage
- Includes in Authorization header for all API calls
- Handles token expiration with appropriate error messages

### Data Validation
- Client-side validation before API calls
- Server-side validation handled by backend
- Proper error display for validation failures

## Usage Instructions

### For Frontend Developers

1. **Setup**: Ensure `react-hot-toast` is installed for notifications
2. **API URL**: Update the API_URL constant to match your backend URL
3. **Authentication**: Ensure your auth system stores tokens in localStorage
4. **Language**: The component uses `i18n.language` to determine current language

### Required Dependencies
```json
{
  "react-hot-toast": "^2.x.x",
  "framer-motion": "^10.x.x", 
  "@tabler/icons-react": "^2.x.x"
}
```

### Environment Variables (Optional)
```env
REACT_APP_API_URL=http://localhost:3000
```

## Testing Checklist

### Functionality
- [ ] Profile data loads correctly from API
- [ ] Form fields are editable and update state
- [ ] Save button works for all tabs (General, Privacy)
- [ ] Avatar upload works with file validation
- [ ] Success/error messages appear correctly
- [ ] Loading states work properly

### Bilingual Support
- [ ] All text displays correctly in Arabic
- [ ] All text displays correctly in English  
- [ ] Language switching works without page refresh
- [ ] RTL layout works properly for Arabic

### API Integration
- [ ] Authentication headers are sent correctly
- [ ] API endpoints receive correct data format
- [ ] Error responses are handled gracefully
- [ ] Success responses update UI appropriately

## Troubleshooting

### Common Issues

1. **"Please login first" error**
   - Check if accessToken exists in localStorage
   - Verify token is not expired

2. **API calls failing**
   - Verify API_URL is correct
   - Check network connectivity
   - Ensure backend is running

3. **File upload not working**
   - Check file size (must be < 5MB)
   - Verify file type (JPEG, PNG, WebP only)
   - Ensure backend upload endpoint exists

4. **Language not switching**
   - Verify i18n is properly configured
   - Check if `lang` variable is getting correct value

## Future Enhancements

### Potential Improvements
- Add image cropping before upload
- Implement drag-and-drop for avatar upload
- Add more countries to country dropdown
- Implement real-time validation feedback
- Add profile completion percentage
- Implement undo functionality for changes

This updated Profile page now provides a complete, secure, and user-friendly experience that integrates seamlessly with your backend API while supporting both Arabic and English languages.
