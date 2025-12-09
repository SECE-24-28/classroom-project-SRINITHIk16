import download from "./download.jpeg"
function Image() {
  return (
    <div>
      <h1>Showing</h1>
      <img src={download} alt="img" height="500"/>
    </div>
  );
}
export default Image;