import "uppy/dist/uppy.css";
import React from "react";
class AvatarPicker extends React.Component {
  state = {
    open: false
  };

  render() {
    return (
      <div id="container-upp">
        <label> Upload file </label>
        <input type="file" accept="image/*" />
      </div>
    );
  }
}

export default AvatarPicker;
