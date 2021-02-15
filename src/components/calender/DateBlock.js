import { Calendar, Badge } from "antd";
import { useContext } from "react";
import moment from "moment";
import { TodoContext } from "../../context/TodoContext";

const DateBlock = ({ data }) => {
  const { todos } = useContext(TodoContext);


  function getListData(todo) {
    let tds = todos;
    
    if (tds.length > 0){
      tds.map(x => x["month"] = new Date(moment(x.date.props.children)["_d"].toString()).getMonth() + 1)
      tds.map(x => x["day"] = new Date(moment(x.date.props.children)["_d"].toString()).getDate())
    }

    let date = new Date(todo["_d"].toString());
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    tds = tds.filter(x => x.month === month && x.day === day)
    let listData = [];
    tds.map(todo => {
      listData.push({ type: "success", content: todo.todo })
    })

    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul style={{listStyleType: 'none'}}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <Calendar dateCellRender={dateCellRender} />
    </>
  );
};
export default DateBlock;