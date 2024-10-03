import Swal from "sweetalert2";


export function SuccessMessage ({title, text, score}) {
    Swal.fire({
        title: title,
        text: text,
        html: `<div style="font-size: 20px; margin-top: 10px;">
              <strong>Congratulations!</strong> <br/>
              You scored a band <div style="font-size: 64px; font-weight: 800; color: #22c55e;" >
              ${score}
                </div>
            </div>`,
        icon: "success",
        cancelButtonColor: "#017d88",
        confirmButtonColor: "#017d88",
        showConfirmButton: false,
        iconColor: '#4CAF50',
        background: '#fefefe',
        color: '#333',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#3085d6',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
      });
};

export function ErrorMessage (error) {
    let message;

  // Check if the error is an object and has a message property
  if (error && typeof error === "object") {
    // Look for specific error fields (like message or status)
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message; // For API error responses
    } else if (error.message) {
      message = error.message; // For generic JavaScript errors
    } else {
      message = JSON.stringify(error); // If it's an object without a message
    }
  } else {
    // If it's a string or something unexpected, display it directly
    message = error ? String(error) : "An unknown error occurred.";
  }

    Swal.fire({
        title: "Error",
        text: `Error:  ${message}`,
        icon: "error",
        cancelButtonColor: "#017d88",
        confirmButtonColor: "#017d88",
        showConfirmButton: true,
        customClass: { 
          popup : "z-9999"
        }
      
      });
}


export function SuccessMessageText(success) {
  let message;

  // Check if the success object has a message property
  if (success && typeof success === "object") {
    // Look for specific success message fields
    if (success.response && success.response.data && success.response.data.message) {
      message = success.response.data.message; // For API success responses
    } else if (success.message) {
      message = success.message; // For generic success messages
    } else {
      message = JSON.stringify(success); // If it's an object without a message
    }
  } else {
    // If it's a string or something unexpected, display it directly
    message = success ? String(success) : "Operation completed successfully.";
  }

  Swal.fire({
    title: "Success",
    text: `${message}`,
    icon: "success",
    confirmButtonColor: "#017d88",
    showConfirmButton: false,
  });
}
