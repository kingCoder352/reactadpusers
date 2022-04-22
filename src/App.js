import './App.css';
import {Fragment, useCallback, useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredValue, setFilteredValue] = useState('');

  const searchForUserHandler = (event) => {
    let searchValue = event.target.value;
    setFilteredValue(searchValue);
  }

  const filteredUsers = users.filter(user => {
    return  user.name.toLowerCase().includes(filteredValue.toLowerCase());
  });

  const fetchUsersHandler = useCallback(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const allUsers = [];

      for (const key in data) {
        allUsers.push({
          id: key,
          name: data[key].name,
          street: data[key].address.street,
          suite: data[key].address.suite,
          city: data[key].address.city,
          zipcode: data[key].address.zipcode
        });
      }
      setUsers(allUsers);
    } catch (error) {
      console.log(error.message);
    }
  }, [setUsers]);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  let content = filteredUsers.map(user => {
    return (
        <Accordion key={user.id}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
          >
            <Typography>{user.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{user.street}</Typography>
            <Typography>{user.suite}</Typography>
            <Typography>{user.city}</Typography>
            <Typography>{user.zipcode}</Typography>
          </AccordionDetails>
        </Accordion>
    );
  });

  if (filteredUsers.length === 0) {
    content = <p>No users found.</p>
  }

  return (
      <Fragment>
        <h1 className="header">ADP Users</h1>
        <input className="filter-input" placeholder="Filter" onChange={searchForUserHandler}/>
        {content}
      </Fragment>
  );
}

export default App;
