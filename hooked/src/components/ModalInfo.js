import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
  
    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
/**
 * Component that alerts if you click outside of it
 */
export default function ModalInfo(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
  
    return <div ref={wrapperRef}>{props.children}</div>;
}

// const ModalInfo = ({ modalInfo,modalToggle }) => {

//   return (
//     console.log(modalInfo),
//     <div id="myModal" className="modal">
//         <div className="modal-content">
//         <span className="close" onClick={modalToggle}>&times;</span>
//         <p>
//             {modalInfo.Released}
//             {modalInfo.Rated}
//         </p>
//         <p></p>
//         </div>
//     </div>
//   );
// };

// export default ModalInfo;