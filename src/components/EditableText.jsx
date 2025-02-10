const EditableText = ({ text, setText, size }) => (
  <div>
    <p
      className={`outline-none font-semibold text-lg bg-transparent w-fit ${size==="sm" && "text-sm"}`}
      onBlur={(e) => setText(e.target.textContent)}
      suppressContentEditableWarning
      contentEditable
    >
      {text}
    </p>
  </div>
);

export default EditableText;
