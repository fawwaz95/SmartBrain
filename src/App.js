import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation.js';
import Signin from './Components/Signin/Signin.js';
import Register from './Components/Register/Register.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import './App.css';
import 'tachyons';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route:'Signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component{
  constructor(){
    super();
    this.state = initialState
  }

  loadUser = (data) => {
      this.setState({ 
        user:{
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      })
  }

  onRouteChange = (route) => {
    if(route === 'Signout' || route === 'Signin'){
      this.setState(initialState);
    }else if (route === 'Home' || route === 'Register'){
      this.setState({route: route});
    }
  }

  calculateFaceLocation = (data) => {
    console.log("What do we have here");
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    //Since the width and height return a string we need to cast it into an number
    //This was we can make some calculations using these variables
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace)
    //return an object and using the response calculate the position 
    //to create a box around the face of the image 
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
          fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input,
            })
          }).then(response => response.json())
            .then(response => {
              if(response){
                fetch('http://localhost:3000/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id,
                  })
                })
                  .then(resp => resp.json())
                  .then(count => {
                    this.setState(Object.assign(this.state.user.entries, {entries: count}))
                  })
                  .catch(err => console.log(err))
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => console.log(err));
    }
 

  render(){
    const {box, imageUrl, route} = this.state;
    return (
      <div className="App">
        {
          this.state.route === 'Home' ?
            <div>
              <Navigation onRouteChange={this.onRouteChange}/>
              <Logo /> 
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : route === 'Signin' ?
              <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>

        }
      </div>
    );
  }
}

export default App;
