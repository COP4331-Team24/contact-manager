import React from 'react';
import axios from 'axios';
import Contact from "./Contact";
import CreateContact from "./CreateContact";

class ViewContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            filtered: [],
            searchString: ''
        };

        this.getAllContacts = this.getAllContacts.bind(this);
        this.filterContacts = this.filterContacts.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    // componentDidMount() is called after a component is slapped into DOM
    // Because we're trying to view all the contacts, query the api for them
    componentDidMount() {
        this.getAllContacts();
    }

    refresh() {
        let self = this;
        self.getAllContacts();
        this.setState({ filtered: self.state.contacts });
    }

    getAllContacts() {
        this.setState({ contacts: [] })
        axios.get('/contacts/')
            .then(res => {
                this.setState({ contacts: res.data });
                this.setState({ filtered: this.state.contacts });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    filterContacts(event) {
        let self = this;
        let search = event.target.value.toLowerCase();

        self.setState({ filtered: [] }, () => {
            let temp = self.state.contacts.filter(function (contact) {
                return (contact.firstname + " " + contact.lastname).toLowerCase().includes(search)
                    || (contact.number).includes(search);
            })
            self.setState({ searchString: search });
            self.setState({
                filtered: temp
            })
        })
    }

    displayContacts() {
        let self = this;
        // For each contact in contacts, return a new contact component
        return this.state.filtered.map(function (contact, i) {
            // {...contact} is JavaScript's unpacking operator, 
            // basically saves the trouble of writing firtname={contact.firstname} and so on..
            return <Contact refreshParent={self.refresh} {...contact} key={i} />;
        })
    }

    showAddForm(event) {

    }

    render() {
        return (
            <div>
                <CreateContact refreshParent={this.refresh} />
                <div className="d-flex flex-column justify-content-center">
                    <div className="w-50 ml-auto mr-auto mb-3">
                        <div className="d-flex justify-content-between">
                            <h1>View all contacts</h1>
                            <button
                                className="btn btn-info m-2"
                                data-toggle="modal"
                                data-target="#create-modal">
                                Add Contact
                            </button>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="search"
                                onChange={this.filterContacts}
                                className="form-control"
                                value={this.state.searchString}
                                placeholder="Filter contacts"
                                autoComplete="off" />
                        </div>
                    </div>
                    <div className="w-50 ml-auto mr-auto">
                        {this.displayContacts()}
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewContacts;