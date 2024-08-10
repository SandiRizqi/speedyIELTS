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

export function ErrorMessage (e) {
    Swal.fire({
        title: "Error",
        text: `Error ${e}`,
        icon: "error",
        cancelButtonColor: "#017d88",
        confirmButtonColor: "#017d88",
        showConfirmButton: true,
      });
}