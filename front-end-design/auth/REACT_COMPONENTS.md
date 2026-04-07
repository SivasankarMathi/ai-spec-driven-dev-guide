# React Component Breakdown

## Component Structure for React Conversion

### 1. **AuthLayout** (Container Component)
- **Purpose**: Wrapper for authentication pages
- **Features**: 
  - Centered layout
  - Background styling
  - Responsive container
- **Props**: `children`

### 2. **AuthCard** (Presentational Component)
- **Purpose**: White card container for auth forms
- **Features**: 
  - Card styling with shadow
  - Padding and border radius
  - Animation on mount
- **Props**: `title`, `children`, `footer`

### 3. **SignUpForm** (Smart Component)
- **Purpose**: Complete sign-up form with validation
- **State**:
  - `name` (string)
  - `email` (string)
  - `password` (string)
  - `confirmPassword` (string)
  - `errors` (object)
  - `isLoading` (boolean)
- **Methods**: 
  - `handleSubmit()`
  - `validateForm()`
  - `handleInputChange()`
- **Child Components**: `FormGroup`, `Button`, `Link`

### 4. **SignInForm** (Smart Component)
- **Purpose**: Sign-in form with OAuth options
- **State**:
  - `email` (string)
  - `password` (string)
  - `errors` (object)
  - `isLoading` (boolean)
- **Methods**: 
  - `handleSubmit()`
  - `validateForm()`
  - `handleInputChange()`
  - `handleOAuthLogin(provider)`
- **Child Components**: `FormGroup`, `Button`, `OAuthButtons`, `Divider`

### 5. **FormGroup** (Reusable Component)
- **Purpose**: Label + Input field combination
- **Props**:
  - `label` (string)
  - `type` (string: text, email, password)
  - `id` (string)
  - `value` (string)
  - `onChange` (function)
  - `placeholder` (string)
  - `error` (string | undefined)
  - `showPasswordToggle` (boolean)
  - `link` (object: { text, href, onClick })
- **Features**: 
  - Error display
  - Password visibility toggle
  - Optional link (for "Forgot password?")

### 6. **PasswordInput** (Reusable Component)
- **Purpose**: Input field with password visibility toggle
- **Props**:
  - `id` (string)
  - `value` (string)
  - `onChange` (function)
  - `placeholder` (string)
  - `error` (string | undefined)
- **State**: `isVisible` (boolean)
- **Features**: Eye icon toggle button

### 7. **Button** (Reusable Component)
- **Purpose**: Primary and OAuth styled buttons
- **Props**:
  - `variant` ('primary' | 'oauth')
  - `children` (ReactNode)
  - `onClick` (function)
  - `disabled` (boolean)
  - `loading` (boolean)
  - `icon` (ReactNode - for OAuth buttons)
  - `type` ('button' | 'submit')
- **Variants**: 
  - Primary (blue, full width)
  - OAuth (white, bordered, with icon)

### 8. **OAuthButtons** (Component)
- **Purpose**: Container for OAuth provider buttons
- **Props**: 
  - `onGoogleLogin` (function)
  - `onMicrosoftLogin` (function)
- **Features**: 
  - Google button with logo
  - Microsoft button with logo
  - Consistent spacing

### 9. **Divider** (Presentational Component)
- **Purpose**: "Or" divider with horizontal line
- **Props**: `text` (string, default: "Or")
- **Features**: Line with centered text

### 10. **Link** (Reusable Component)
- **Purpose**: Styled navigation links
- **Props**:
  - `href` (string)
  - `onClick` (function)
  - `children` (ReactNode)
- **Features**: Hover states, color transitions

---

## Folder Structure Recommendation

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.jsx
│   │   ├── AuthCard.jsx
│   │   ├── SignUpForm.jsx
│   │   ├── SignInForm.jsx
│   │   └── OAuthButtons.jsx
│   ├── form/
│   │   ├── FormGroup.jsx
│   │   ├── PasswordInput.jsx
│   │   └── Input.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Link.jsx
│       └── Divider.jsx
├── pages/
│   ├── SignUp.jsx
│   └── SignIn.jsx
├── hooks/
│   ├── useAuth.js
│   └── useForm.js
├── styles/
│   ├── auth.module.css (or styled-components)
│   └── variables.css
└── utils/
    └── validation.js
```

---

## State Management Considerations

### Option 1: Context API
- Create `AuthContext` to manage authentication state
- Providers: `AuthProvider`
- Consumers: `useAuth()` hook

### Option 2: Redux / Zustand
- `authSlice` for authentication state
- Actions: `login()`, `logout()`, `register()`

---

## Custom Hooks Needed

### 1. **useForm**
```javascript
const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  onSubmit: async (values) => { /* submit logic */ },
  validate: (values) => { /* validation logic */ }
});
```

### 2. **useAuth**
```javascript
const { user, login, logout, register, isLoading } = useAuth();
```

### 3. **usePasswordToggle**
```javascript
const { isVisible, toggle, inputType } = usePasswordToggle();
```

---

## Validation Requirements

### Sign Up Form:
- **Name**: Required, min 2 characters
- **Email**: Required, valid email format
- **Password**: Required, min 8 characters, 1 uppercase, 1 number
- **Confirm Password**: Must match password

### Sign In Form:
- **Email**: Required, valid email format
- **Password**: Required

---

## Icons Needed

1. **Eye Icon** (password visibility toggle)
   - Use: `react-icons` (FiEye, FiEyeOff) or custom SVG
   
2. **Google Logo** (OAuth)
   - Already included as SVG in HTML
   
3. **Microsoft Logo** (OAuth)
   - Already included as SVG in HTML

---

## Accessibility Considerations

- ✅ Proper `label` elements with `htmlFor`
- ✅ ARIA labels for password toggle buttons
- ✅ Focus states on all interactive elements
- ✅ Keyboard navigation support
- ✅ Error messages linked to inputs via `aria-describedby`
- ✅ Form validation with clear error messages

---

## Additional Features to Implement

1. **Form Validation**
   - Real-time validation on blur
   - Display errors below inputs
   - Disable submit button until valid

2. **Loading States**
   - Show spinner on submit button
   - Disable form inputs during submission

3. **Success/Error Notifications**
   - Toast messages for success/failure
   - Redirect on successful login/signup

4. **Forgot Password Flow**
   - Separate page/modal for password reset

5. **OAuth Integration**
   - Google OAuth 2.0
   - Microsoft OAuth 2.0

---

## Technologies Recommended

- **React** (v18+)
- **React Router** (for navigation)
- **React Hook Form** or **Formik** (form management)
- **Yup** or **Zod** (validation schema)
- **Axios** or **Fetch** (API calls)
- **React Hot Toast** or **React Toastify** (notifications)
- **CSS Modules** or **Styled Components** (styling)

---

## API Integration Points

### Sign Up
```javascript
POST /api/auth/signup
Body: { name, email, password }
Response: { user, token }
```

### Sign In
```javascript
POST /api/auth/signin
Body: { email, password }
Response: { user, token }
```

### OAuth
```javascript
GET /api/auth/google
GET /api/auth/microsoft
```

### Forgot Password
```javascript
POST /api/auth/forgot-password
Body: { email }
```
