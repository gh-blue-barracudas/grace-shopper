import React from 'react'
import Button from '@material-ui/core/Button'

const AboutUs = () => {
  return (
    <div id="aboutUs_parent">
      <div id="aboutUsInfo">
        <div id="aboutUsText">
          <h1>ABOUT</h1>
          <p>
            The world was stunned when the GH1904FS virus afflicted 30% of the
            population in April of 2019. Our noble scientific community
            scrambled to come up with a vaccine before mortality rates hit an
            all time high. Although the vaccine was successful in effectively
            curbing the epidemic, there was one significant side effect: Humans
            lost the ability to dream.
          </p>
          <p>
            Our innovative scientists at Grace Shopper, nicknamed the Blue
            Barracudas, united together to concoct "potions" that allow the
            everyday consumer to dream once more.
          </p>
          <p>
            Browse our selection of potions and be prepared to be amazed. Our
            dreams make for an unforgettable night and are wonderful gifts for
            your loved ones. We also offer a selection of nightmares that can be
            enjoyed by daredevils and nemeses alike.
          </p>
          <p>
            We're always constantly hard at work at developing a wider portfolio
            of dreams and nightmares. After all, life is too short not to dream.
          </p>
          <Button
            style={{
              opacity: '50%',
              backgroundColor: '#fff2ab',
              marginTop: '20px',
              width: '15vw'
            }}
          >
            SHOP ALL
          </Button>
        </div>
        <img id="aboutUsImg" src="https://i.imgur.com/rvBAP42.jpg" />
      </div>
    </div>
  )
}

export default AboutUs
