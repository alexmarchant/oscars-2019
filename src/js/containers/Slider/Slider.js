


import React, { Component } from 'react'
// import * as SliderActions from '../actions'
// import * as SettingsActions from '../actions/settings'
import Slide from './Slide'
// import Settings from './settings'
import styles from './styles.css'

export class Slider extends Component {
  state = {
    interval: null,
    index: 0,
    translateValue: 0,
    autoplay: true,
    images: [
      'a-star-is-born',
      'bohemian',
      'roma',
      'into-the-spiderverse',
      'black-panther',
      'blackkklansman'
    ]
  }

  componentDidMount = () => {
    const interval = window.setInterval(() => {
        this.goToNextSlide()
      }, 6000)
    this.setState({ interval })
  }

  renderSlides = () => {
    const { images } = this.state
    return images.map((curr, i) =>
      <Slide
        key={i}
        image={this.state.images[i]}
      />
    )
  }

  render() {
    const {
      images,
      index,
      translateValue,
      toggleSetting,
      autoplay
    } = this.state

    return (
      <div className={styles.slider}>

        <div className={styles.sliderWrapper}
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s',
            position: 'relative',
            height: '100%',
            width: '100%'
          }}>
            { this.renderSlides() }
        </div>
      </div>
    )
  }


  goToNextSlide = () => {
    const {
      images,
      index,
      translateValue
    } = this.state

    if(index === images.length - 1) {
      this.setTranslateValue(0)
      return this.setIndex(0)
    }

    this.setTranslateValue(translateValue - this.slideWidth())
    this.setIndex(index + 1)
  }

  setTranslateValue = (val) => {
    this.setState({
      translateValue: val
    })
  }

  setIndex = (val) => {
    this.setState({
      index: val
    })
  }

  slideWidth = () => {
    return document.querySelector('.slide').clientWidth
  }

}



export default Slider;
