
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
const moment = require("moment")

function App() {

  const [category, setCategory] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [active, setActive] = useState()
  const [id, setId] = useState(null)

  //get
  const getListCategory = () =>{
    axios({
      url: "http://localhost:8080/api/v1/category",
      method: "GET"
    }).then(res => {
      setCategory(res.data?.data)
      setId(null)
      setName("")
      setDescription("")
    })
  }

  useEffect(() => {
    getListCategory()
  }, [])


  //delete
  const onDelete = (item) =>{
    axios({
      url: "http://localhost:8080/api/v1/category",
      method: "DELETE",
      data:{
        id: item.id
      }
    }).then(res => {
      getListCategory()
    })
  }

  //create
  const onSave = () =>{
    if(id==null){
      axios({
            url: "http://localhost:8080/api/v1/category",
            method: "POST",
            data:{
              name: name,
              description: description
            }
          }).then(res => {
            getListCategory()
          })
    }else{
      axios({
        url: "http://localhost:8080/api/v1/category",
        method: "PUT",
        data:{
          name: name,
          description: description,
          id: id
        }
      }).then(res => {
        getListCategory()
      })

    }
  }

  //edit
  const onClickEdit = (item) =>{
    setName(item.name)
    setDescription(item.description)
    setId(item.id)
  }

  return (
    <div className="App">
        <h2>List Category</h2>
        <div>
          <input 
              type="text" 
              placeholder='category name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
          /><br/>
          <input 
            type="text" 
            placeholder='description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          /><br/>
          <select
            value={active}
            onChange={(e) =>{
              setActive(e.target.value)
            }}
          >
            <option value={1}>Active</option>
            <option value={0}>Disable</option>
          </select>
          <button onClick={onSave}>{id==null ? "Save":"Update"}</button>
        </div>
        <input type="search" id="gsearch" name="gsearch" />
        <table>
          <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Active</th>
            <th>Description</th>
            <th>Create at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          category.map((item, index) =>{
            return (
              <tr>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td style={{color: "green"}}>{item.is_active === 1 ? "Active" : "Disable"}</td>
                <td>{item.description}</td>
                <td>{moment(item.create_at).format("DD/MM/YYYY")}</td>
                <td>
                  <button style={{color: "blue"}} onClick={() => onClickEdit(item)}>Edit</button>
                  <button style={{color: "red"}} onClick={() => onDelete(item)}>Remove</button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
        </table>
        
        
    </div>
  );
}

export default App;
