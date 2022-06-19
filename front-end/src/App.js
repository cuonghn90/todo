import './App.css';

import { useState, useEffect } from 'react'

import {
  MdFileDownloadDone, MdOutlineDoneAll
} from 'react-icons/md'
import {
  IoMdTrash
} from 'react-icons/io'
import {
  FaEdit
} from 'react-icons/fa'
import {
  RiChatDeleteFill
} from 'react-icons/ri'

function App() {
  const [textTodo, setTextTodo] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [indexEdit, setIndexEdit] = useState(null)
  const [listTodo, setListTodo] = useState([])
  const [listTodoDone, setListTodoDone] = useState([])
  const [typeToastMessage, setTypeToastMessage] = useState({ type: "success", text: "Add new todo success", clr: "rgb(248, 119, 143)" })
  const handleAddTodo = async () => {
    let checkExsited = false;
    for (let i = 0; i < listTodo.length; i++) {
      if (listTodo[i].textTodo == textTodo) {
        checkExsited = true;
        break;
      }
    }
    if (isEdit) {
      if (indexEdit != null) {
        if (!checkExsited) {
          if (textTodo.trim() == "" || textTodo.length == 0) {
            console.log("dont todo empty");
          } else {
            // await fetch("http://localhost:8080/todo/" + indexEdit + "?textTodo=" + textTodo, { method: "PUT" }).then(() => console.log("sua thanh cong"))
            // await fetch("http://localhost:8080/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
            await fetch("https://todocrudvs1.herokuapp.com/todo/" + indexEdit + "?textTodo=" + textTodo, { method: "PUT" }).then(() => console.log("sua thanh cong"))
            await fetch("https://todocrudvs1.herokuapp.com/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
            setTypeToastMessage({ type: "edit", text: "Edit todo success", clr: "pink" })
            const toastMessage = document.querySelector(".toastMessage")
            toastMessage.classList.remove("out")
            toastMessage.classList.add("on")
            setTimeout(() => {
              toastMessage.classList.remove("on")
              toastMessage.classList.add("out")
            }, 1000)
            setTextTodo("")
            setIsEdit(false)
          }

        }
        else {
          console.log("todo is exsited");
        }
      }
      else {
        console.log("error");
      }
    }
    else {
      if (!checkExsited) {
        if (textTodo.trim() == "" || textTodo.length == 0) {
          console.log("dont todo empty");
        } else {
          // await fetch("http://localhost:8080/todo" + "?textTodo=" + textTodo, { method: "POST" }).then(() => console.log("them thanh cong"))
          // await fetch("http://localhost:8080/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
          await fetch("https://todocrudvs1.herokuapp.com/todo" + "?textTodo=" + textTodo, { method: "POST" }).then(() => console.log("them thanh cong"))
          await fetch("https://todocrudvs1.herokuapp.com/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
          setTextTodo("")
          const toastMessage = document.querySelector(".toastMessage")
          setTypeToastMessage({ type: "success", text: "Add new todo success", clr: "rgb(248, 119, 143)" })
          toastMessage.classList.remove("out")
          toastMessage.classList.add("on")
          setTimeout(() => {
            toastMessage.classList.remove("on")
            toastMessage.classList.add("out")
          }, 1000)
        }
      }
      else {
        console.log("todo is exsited");
      }
    }

  }
  const handleEdit = (index) => {
    setIndexEdit(index)
    setIsEdit(true)
    const newTodo = listTodo.filter((todo) => {
      if (todo.id == index) {
        return todo
      }
    })
    setTextTodo(newTodo[0].textTodo)
  }
  const handleDelete = async (index) => {
    // await fetch("http://localhost:8080/todo/" + index, { method: "DELETE" }).then(() => console.log("xoa thanh cong"))
    // await fetch("http://localhost:8080/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
    await fetch("https://todocrudvs1.herokuapp.com/todo/" + index, { method: "DELETE" }).then(() => console.log("xoa thanh cong"))
    await fetch("https://todocrudvs1.herokuapp.com/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
    setTypeToastMessage({ type: "delete", text: "Delete todo success", clr: "green" })
    const toastMessage = document.querySelector(".toastMessage")
    toastMessage.classList.remove("out")
    toastMessage.classList.add("on")
    setTimeout(() => {
      toastMessage.classList.remove("on")
      toastMessage.classList.add("out")
    }, 1000)
  }
  const handleDone = async (index) => {
    let checkExsited = false;
    for (let i = 0; i < listTodoDone.length; i++) {
      if (listTodoDone[i].textTodo == textTodo) {
        checkExsited = true;
        break;
      }
    }
    if (!checkExsited) {
      // await fetch("http://localhost:8080/todo/" + index, { method: "POST" }).then(() => console.log("done thanh cong"))
      // await fetch("http://localhost:8080/todo/done").then(respone => respone.json()).then(result => setListTodoDone([...result]))
      // await fetch("http://localhost:8080/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
      await fetch("https://todocrudvs1.herokuapp.com/todo/" + index, { method: "POST" }).then(() => console.log("done thanh cong"))
      await fetch("https://todocrudvs1.herokuapp.com/todo/done").then(respone => respone.json()).then(result => setListTodoDone([...result]))
      await fetch("https://todocrudvs1.herokuapp.com/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
    }
    else {
      console.log("todo done is exsited");
    }
    setTypeToastMessage({ type: "done", text: "Done todo success", clr: "blue" })
    const toastMessage = document.querySelector(".toastMessage")
    toastMessage.classList.remove("out")
    toastMessage.classList.add("on")
    setTimeout(() => {
      toastMessage.classList.remove("on")
      toastMessage.classList.add("out")
    }, 1000)

  }
  const handleDeleteTodoDone = async (index) => {
    // await fetch("http://localhost:8080/todo/" + index, { method: "DELETE" }).then(() => console.log("xoa thanh cong"))
    // await fetch("http://localhost:8080/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
    // await fetch("http://localhost:8080/todo/done").then(respone => respone.json()).then(result => setListTodoDone([...result]))
    await fetch("https://todocrudvs1.herokuapp.com/todo/" + index, { method: "DELETE" }).then(() => console.log("xoa thanh cong"))
    await fetch("https://todocrudvs1.herokuapp.com/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
    await fetch("https://todocrudvs1.herokuapp.com/todo/done").then(respone => respone.json()).then(result => setListTodoDone([...result]))
    setTypeToastMessage({ type: "deleteDone", text: "Delete todo done success", clr: "orange" })
    const toastMessage = document.querySelector(".toastMessage")
    toastMessage.classList.remove("out")
    toastMessage.classList.add("on")
    setTimeout(() => {
      toastMessage.classList.remove("on")
      toastMessage.classList.add("out")
    }, 1000)
  }
  useEffect(() => {
    // fetch("http://localhost:8080/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
    fetch("https://todocrudvs1.herokuapp.com/todo").then(respone => respone.json()).then(result => setListTodo([...result]))
  }, [])
  useEffect(() => {
    // fetch("http://localhost:8080/todo/done").then(respone => respone.json()).then(result => setListTodoDone([...result]))
    fetch("https://todocrudvs1.herokuapp.com/todo/done").then(respone => respone.json()).then(result => setListTodoDone([...result]))
  }, [])
  return (
    <div className="App">
      <div className="wrapperTodo">
        <div className="wrapperInput">
          <input type="text" value={textTodo} onChange={(e) => {
            setTextTodo(e.target.value)
          }} className="inputCell" placeholder='Enter your todo'></input>
          <button className="buttonAdd" onClick={() => handleAddTodo()}><span>Add</span></button>
        </div>
        <div className="wrapperListTodo">
          <ul className="listTodo">
            {
              listTodo.map((todo, index) => {
                if (todo.status == "working") {
                  return <div className="itemTodo" key={index} data-id={index}>
                    <div className="textTodo">{todo.textTodo}</div>
                    <div className="editTodo" data-id={index} onClick={() => handleEdit(todo.id)}>E</div>
                    <div className="deleteTodo" data-id={index} onClick={() => handleDelete(todo.id)}>D</div>
                    <div className="doneTodo" data-id={index} onClick={() => handleDone(todo.id)}>Do</div>
                  </div>
                }

              })
            }
          </ul>
        </div>
        <div className="wrapperDoneListTodo">
          <ul className="listTodoDone">
            {listTodoDone.map((todoDone, index) =>
              <div className="todoDone" key={index} data-id={index}>
                <div className="textTodoDone">{todoDone.textTodo}</div>
                <div className="deleteTodoDone" data-id={index} onClick={() => handleDeleteTodoDone(todoDone.id)}>Delete</div>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="toastMessage" style={{ "--clr": typeToastMessage.clr }}>
        <div className="iconMessage">
          {typeToastMessage.type == "success" ? <MdFileDownloadDone></MdFileDownloadDone> : ""}
          {typeToastMessage.type == "edit" ? <FaEdit></FaEdit> : ""}
          {typeToastMessage.type == "delete" ? <IoMdTrash></IoMdTrash> : ""}
          {typeToastMessage.type == "deleteDone" ? <RiChatDeleteFill></RiChatDeleteFill> : ""}
          {typeToastMessage.type == "done" ? <MdOutlineDoneAll></MdOutlineDoneAll> : ""}
        </div>
        <div className="textMessage">{typeToastMessage.text}</div>
      </div>

    </div >
  );
}

export default App;
