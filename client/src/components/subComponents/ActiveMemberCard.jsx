import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'

const ActiveMemberCard = ({eachList}) => {
  // console.log(eachList)
  return (
    <ListGroup.Item title={eachList.userId}>{eachList.userName}</ListGroup.Item>
  )
}

ActiveMemberCard.propTypes ={
    eachList: PropTypes.object.isRequired
}
export default ActiveMemberCard
