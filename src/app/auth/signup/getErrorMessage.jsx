export default function getErrorMessage(error) {
  const code = error.code;
  switch(code) {
      case 'auth/email-already-in-use':
          return 'This email is already registered. Please use a different email or try logging in.';
      case 'auth/invalid-email':
          return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
          return 'This sign-up method is not allowed. Please contact support.';
      case 'auth/weak-password':
          return 'Your password is too weak. Please choose a stronger password.';
      case 'auth/invalid-credential':
          return 'Your email or password is invalid. Please check and try again.';
      case 'auth/user-disabled':
          return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
          return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
          return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
          return 'Too many unsuccessful attempts. Please try again later.';
      case 'auth/network-request-failed':
          return 'Network error. Please check your internet connection and try again.';
      case 'auth/popup-closed-by-user':
          return 'The sign-in popup was closed before completing the process. Please try again.';
      case 'auth/unauthorized-domain':
          return 'This domain is not authorized for OAuth operations. Please contact support.';
      case 'auth/expired-action-code':
          return 'The action code has expired. Please request a new one.';
      case 'auth/invalid-action-code':
          return 'The action code is invalid. Please check and try again or request a new one.';
      default:
          console.error('Unhandled Firebase auth error:', error);
          return 'An unexpected error occurred. Please try again later or contact support.';
  }
}