import React from 'react';
import './App.css';
import Form from './Form'

class App extends React.Component {
  constructor(props){
    super (props);
    this.state = {
      posts: [],
      post_text: '',
      is_boast: false,
      post_filter: 'post.id',
      vote_score_order : [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortPost = this.sortPost.bind(this);
  }

  async likePost(event){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const res = await fetch('http://127.0.0.1:8000/api/boastorroast/'
    + event.target.parentElement.id + '/like/', requestOptions);
    const data = await res.json();
    console.log(data)
    window.location.reload()
  }

  async dislikePost(event){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const res = await fetch('http://127.0.0.1:8000/api/boastorroast/' 
    + event.target.parentElement.id + '/like/', requestOptions);
    const data = await res.json();
    console.log(data)
    window.location.reload()
  }

  sortPost(event){
    this.setState({post_filter: event.target.id})
  }

  handleChange(event){
    if (event.target.type === 'text'){
      this.setState({post_text: event.target.value});
    }
    if (event.target.type === 'checkbox'){
      if(event.target.checked){
        this.setState({is_boast: true});
      } else {
        this.setState({is_boast: false});
      }
    }
  }

  displayForm(){
    let form = document.getElementById('formComp');
    if (form.style.display === 'none'){
      form.style.display = 'block'
    } else{
      form.style.display = 'none'
    }
  }

  async handleSubmit(event){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: this.state.post_text,
          is_boast: this.state.is_boast
        })
      }
      const res = await fetch('http://127.0.0.1:8000/api/boastorroast/', requestOptions);
      const data = await res.json();
      this.setState({posts: data})
      event.preventDefault();
  }

  async getVoteScoreOrder(){
    const res = await fetch('http://127.0.0.1:8000/api/boastorroast/voteScoreOrder');
    const data = await res.json();
    this.setState({vote_score_order: data})
  }

  componentDidMount(){
    const url = 'http://127.0.0.1:8000/api/boastorroast/'
    fetch(url)
    .then(res => res.json())
    .then(data => this.setState({posts: data}));
  }
  
  render(){
    const post_filter = this.state.post_filter // 'post.id'
    let data = ''
    switch (post_filter){
      default:
        data = this.state.posts.filter(post => post.id).reverse();
        break;

      case 'boastbtn': 
        data = this.state.posts.filter(post => post.is_boast === true);
        break;

      case 'roastbtn':
        data = this.state.posts.filter(post => post.is_boast === false);
        break;

      case 'popularbtn':
        this.getVoteScoreOrder()
        data = this.state.vote_score_order
        break;
    }

    return (
      <div>
        <h1>GhostPost</h1>
        <span>
          <button onClick={this.displayForm}>create a post</button>
          <button onClick={this.sortPost} id='boastbtn'>filter by boast</button>
          <button onClick={this.sortPost} id='roastbtn'>filter by roast</button>
          <button onClick={this.sortPost} id='popularbtn'>filter by popular</button>
        </span>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          post_text={this.state.post_text}
        />
        <ul>
          {data.map((s) => (
            <li key={s.id} id={s.id}>
              <p>{s.description}</p>
              <p>{s.vote_score}</p>
              <p>{s.is_boast.toString()}</p>
              <p>{s.date}</p>
              <button onClick={this.likePost}>like</button>
              <button onClick={this.dislikePost}>dislike</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
