

export default function getErrorMessage(error) {
    const code = error.code;
    switch(code) {
    case 'auth/invalid-email':
        return 'Please input valid email';
    case 'auth/invalid-credential':
        return 'Your Email or Password is invalid';
    default:
      return 'Something Error with Server';
    }
  }