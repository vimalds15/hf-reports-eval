const ConversationBar = ({ submitHandler }) => {
  return (
    <form
      onSubmit={submitHandler}
      onClick={(e) => e.stopPropagation()}
      className="absolute bg-white flex shadow-lg max-w-2xl left-1/2 -translate-x-1/2 bottom-6 w-full rounded-full overflow-hidden border-t border-[#FF7A0050] shadow-[#ff7a0040]"
    >
      <input
        name="chat-message"
        className="w-full bg-gray-white py-2 px-4 focus:outline-none "
      />
      <button
        type="submit"
        className="bg-gradient-primary flex items-center justify-between px-6 text-white font-semibold rounded-full cursor-pointer"
      >
        Send
      </button>
    </form>
  );
};

export default ConversationBar;
