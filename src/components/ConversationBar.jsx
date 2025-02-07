import React from "react";

const ConversationBar = ({ submitHandler }) => {
  return (
    <form
      onSubmit={submitHandler}
      onClick={(e) => e.stopPropagation()}
      className="absolute flex shadow-lg max-w-2xl left-1/2 -translate-x-1/2 bottom-6 w-full rounded-full overflow-hidden"
    >
      <input
        name="chat-message"
        className="w-full bg-gray-white py-2 px-4 focus:outline-none"
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
