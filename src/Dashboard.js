import './Dashboard.css'
import Avatar from './Avatar.js'
import Contacts from './Contacts.js';

function Dashboard(){


    return(

        <div className="dashboard">
            <div className="user">
                <Avatar />
                <i class="fas fa-ellipsis-v"></i>
            </div>
            <div className="search-bar">
                <div className="search-bar-container">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search or start new chat"></input>
                </div>
            </div>
            <Contacts/>
            <Contacts/>
            <Contacts/>
        </div>
    )
}

export default Dashboard;