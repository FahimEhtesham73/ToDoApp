import React,{useState,useEffect}from 'react'
import a1 from './images/a1.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Todo.css';




export const Todo = () => {
  const[inputData,setInputdata]=useState('')
  const[items,setItems]=useState(()=>{

    const storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    
    return storedItems;
    
    
  })
  console.log(items)

  const [selectedDate, setSelectedDate] = useState(null);

  const [checkedItems, setCheckedItems] = useState(() => {

    const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    return storedCheckedItems;
  });


  useEffect(() => {

    localStorage.setItem('todoItems', JSON.stringify(items));

  }, [items]);

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const addItem =() =>{
    if(!inputData || !selectedDate){
      return;


    }else{
      setItems([...items, { task: inputData, deadline: selectedDate }])
      setInputdata('');
      setSelectedDate(null);

    }
    console.log(items)
    
  }

  const deleteItem = (id) => {
    console.log(id);
  
    if (checkedItems.includes(id)) {
      
      const updatedCheckedItems = checkedItems.filter((checkedId) => checkedId !== id);
      setCheckedItems(updatedCheckedItems);
  
      
      localStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
    }
  
    
    const updatedItems = items.filter((element, index) => index !== id);
    setItems(updatedItems);
  
    
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
  };
  

  const checkBox=((id)=>{
    const updatedCheckedItems = [...checkedItems];
    const index = updatedCheckedItems.indexOf(id);
    if (index === -1) {
      updatedCheckedItems.push(id);
    } else {
      updatedCheckedItems.splice(index, 1);
    }
    setCheckedItems(updatedCheckedItems);

  })

  

  useEffect(() => {
    console.log(items);
  }, [items]);

  const removeAll=()=>{
    setItems([]);

  }
  
  return (
    <>
        <div className='main'>
            <div className='child'>
              <h1>React TO-DO App</h1>
                <figure>
                    <img src={a1}alt="todopic" style={{ maxWidth: '300px', width: '100%', height: 'auto' }}/>
                    <figcaption><b>Add your Todo task here</b></figcaption>
                </figure>
                <div className='additems'>
                  <input type='text' placeholder="✏️Add Tasks" value={inputData}
                  onChange={(e)=>setInputdata(e.target.value)} />
                  <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} placeholderText="Select Deadline" dateFormat="dd/MM/yyyy" className="date-picker" required/>
                  <i className="fas fa-plus add-btn" title='Add item' onClick={addItem}></i> 
                </div>

          <div className='showitems'>
  
                  {items.map((element, index) => (
                  <div className={`eachitems ${checkedItems.includes(index) ? 'completed' : ''}`} key={index}>
      
                  <input type="checkbox" onChange={() => checkBox(index)} checked={checkedItems.includes(index)} />
                  <label>
        
                  <h3 style={{ textDecoration: checkedItems.includes(index) ? 'line-through' : 'none' }}>{element.task}</h3>
                  <p style={{ textDecoration: checkedItems.includes(index) ? 'line-through' : 'none' }}>{`Deadline: ${new Date(element.deadline).toLocaleDateString()}`}</p>
                  </label>
    
                  <i className="far fa-trash-alt add-btn" title="delete item" onClick={() => deleteItem(index)}></i>
                  </div>
               ))}
          </div>
          <br />
                <div className='showitems'>
                  <button className='clear btn' onClick={removeAll}>Remove All</button>

                </div>

            </div>


        </div>

    </>
  )
}
