import PropTypes from 'prop-types'

const ChatItems = ({messageObj, index}) => {

    console.log(messageObj.message)
    
    const maxLimit = index > 6;
    // const last5message = 
   
if (!maxLimit) {
  return (
    
        <div className={`chat-message ${messageObj.isMine ? 'mine' : 'others'}`}>
            <p className='message text'>{messageObj.message}</p>
            <p className="messageBy text">{messageObj.isMine ? 'You' : messageObj.name}</p>
        </div>
    )
}

}

ChatItems.propTypes = {
    messageObj: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default ChatItems
