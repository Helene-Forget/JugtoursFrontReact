
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';


class GroupEdit extends Component {

  emptyItem = {
    name: '',
    address: '',
    city: '',
    stateOrProvince: '',
    country: '',
    postalCode: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    // Cette liaison est nécessaire afin de permettre
    // l'utilisation de `this` dans la fonction de rappel.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //You put the API call in componentDidMount 
  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/group/${this.props.match.params.id}`)).json();
      this.setState({item: group});//on récupère le .json de l'URL /api/group/{id} généré par Springboot
    }
  }

  handleChange(event) {
    const target = event.target;//C'est une référence à l'objet qui a envoyé l'événement. 
    const value = target.value;//valeur de la cible
    const name = target.name;//nom de la cible
    let item = {...this.state.item};/* The spread operator can be used to take an existing array and add another element to it while still preserving the original array (famous original array’s?*/ 
    item[name] = value;
    this.setState({item});
  }

  

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    await fetch('/api/group/'+(item.id) , {
      
      method: (item.id) ? 'PUT' : 'POST',//s''il y a deja un id on utilise la méthode PUT  sinon on utilise la méthode POST 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/groups');
  }

  

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Group' : 'Add Group'}</h2>;  //S'il y a deja un id on affiche Edit sinon on affiche Add group

    return <div>
              <AppNavbar/>
              <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input type="text" name="name" id="name" value={item.name || ''}
                            onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input type="text" name="address" id="address" value={item.address || ''}
                            onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input type="text" name="city" id="city" value={item.city || ''}
                            onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                          <Label for="stateOrProvince">State/Province</Label>
                          <Input type="text" name="stateOrProvince" id="stateOrProvince" value={item.stateOrProvince || ''}
                                onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                          <Label for="country">Country</Label>
                          <Input type="text" name="country" id="country" value={item.country || ''}
                                onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                          <Label for="country">Postal Code</Label>
                          <Input type="text" name="postalCode" id="postalCode" value={item.postalCode || ''}
                                onChange={this.handleChange} autoComplete="address-level1"/>
                        </FormGroup>
                    </div>

                    
                    <FormGroup>
                      {/*<Button color="primary" type="Submit" onClick={()=> this.update()} >Save</Button>{' '} */}
                      <Button color="primary" type="submit" >Save</Button>
                      <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
                    </FormGroup>
                 </Form>
               </Container>
            </div>
  }
}

export default withRouter(GroupEdit);