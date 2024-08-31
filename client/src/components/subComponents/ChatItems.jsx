import PropTypes from 'prop-types'

const ChatItems = ({messageObj}) => {
  return (
    
        <div className={`chat-message scale-up ${messageObj.isMine ? 'mine' : 'others'}`}>
            {/* <p>{newUser}</p> */}
            <p className='message text'>{messageObj.message}</p>
            <p className="messageBy text">{messageObj.isMine ? 'You' : messageObj.name}</p>
        </div>
    )
}

ChatItems.propTypes = {
    messageObj: PropTypes.object.isRequired,
}

export default ChatItems
