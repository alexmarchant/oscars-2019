import React, { Component } from 'react';
import Layout from './js/components/Layout/Layout';
import Header from './js/components/Header/Header';
import Category from './js/components/Category/Category';
import Auth from './js/containers/Auth/Auth'
import PropTypes from 'prop-types'
import nomineesData from './data/nominees';


class App extends Component {

  state = {
    nomineesList: nomineesData,
    userSelections: {test: "test"}
  };

  componentDidMount() {
    this.getUserPicks()
  }

  getUserPicks = () => {
    let fetchUrl = 'http://api.oscars.alexmarchant.com/users/current-user/picks';
    let token = localStorage.token;

    fetch(fetchUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then((data)=> this.setState({
        userSelections: data
      }, ()=> {this.highlightUserSelections()})
    )
  }

  sendDataHandler = () => {
    let fetchUrl = 'http://api.oscars.alexmarchant.com/users/current-user/picks'
    let token = localStorage.token

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(this.state.userSelections)
    })
      .then(()=> console.log('success'))
      .catch((data)=> console.error(data))
  }

  selectedNomineeHandler = (category, name)=> {
    let nominees = [...this.state.nomineesList]
    let categoryIndex = nominees.findIndex((cat)=> { return (category === cat["title"]) })
    
    nominees[categoryIndex].nominees.forEach((nominee)=> {nominee.selected = false})

    let selectionIndex = nominees[categoryIndex].nominees.findIndex((nominee)=> {
      return ( nominee.name === name  )
    })

    let selection = nominees[categoryIndex].nominees[selectionIndex]
    selection.selected = true

    let userSelections = {...this.state.userSelections}
    userSelections[category] = selection.name

    this.setState({
      nomineesList: nominees,
      userSelections: userSelections
    }, ()=> this.sendDataHandler())
  }

  highlightUserSelections = () => {

    let nomineesList = [...this.state.nomineesList]
    let userSelections = {...this.state.userSelections}

    nomineesList.forEach((category)=> {
      category.nominees.forEach((nominee)=> {
        if (nominee.name === userSelections[category.title]) {
          nominee.selected = true
        }
      })
    })

    this.setState({
      nomineesList: nomineesList
    })
  }

  unselectNomineeHandler = (categoryTitle) => {

    let nominees = [...this.state.nomineesList]
    let categoryIndex = nominees.findIndex((cat)=> { return (categoryTitle === cat["title"]) })
    nominees[categoryIndex].nominees.forEach((nominee)=> {nominee.selected = false})

    this.setState({
      nomineesList: nominees
    })
  }

  renderCategories = () => {

    if (this.state.nomineesList) {
      return this.state.nomineesList.map((nom, index) => (
        <Category
          key={index}
          title={nom.title}
          nominees={nom.nominees}
          clicked={this.selectedNomineeHandler}
        />
      ))
    }
  }

  render() {

    return (
      <div>
        <Layout>
          <Header />
          <Auth />
          {this.renderCategories()}
        </Layout>
      </div>
    )
  }
}

export default App
