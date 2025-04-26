import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import useConversation from "../../stateManagement/useConversation";
import { AuthContext } from "../../context/MessengerContext";
import useSendMessage from "../../context/useSendMessage";

export default function SendMessage() {
  const { selectedConversation } = useConversation();

  const { user } = useContext(AuthContext);
  const { handleSendMessage, loading } = useSendMessage();
  const [message, setMessage] = React.useState("");

  const SendMessage = async (e) => {
    e.preventDefault();
    await handleSendMessage(message);
    setMessage("");
  };

  return (
    <div>
      {selectedConversation ? (
        <div className="">
          <div className="flex items-center gap-2 py-2">
            <form
              onSubmit={SendMessage}
              className="flex items-center gap-2 w-full"
            >
              <input
                type="text"
                placeholder="Type here"
                className="input w-11/12 focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="btn bg-slate-500 w-12 h-12 flex justify-center items-center cursor-pointer" // Adjusted width and height
                type="submit"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
