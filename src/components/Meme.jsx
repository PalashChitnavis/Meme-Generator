/* eslint-disable no-unused-vars */
import React,{useState , useEffect , useRef} from "react";
import Draggable from "react-draggable";
import * as htmlToImage from 'html-to-image'

function Meme(){

    const domEl = useRef(null);

    const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);

    const link = document.createElement('a');
    link.download = "meme-generator-ptc.png";
    link.href = dataUrl;
    link.click();
}

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        width: ""
    })
    const [allFilterMeme, setAllFilterMeme] = React.useState([])
    const [allMemes, setAllMemes] = React.useState([])

    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllFilterMeme(data.data.memes)) 

            const filteredMemes = allFilterMeme.filter(meme => meme.box_count === 2)
            setAllMemes(filteredMemes)

    }, [allFilterMeme])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        const imgwidth = allMemes[randomNumber].width
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url ,
            width: imgwidth 
        }))    
    }
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return(
        <>
            <div className="root">
            <div className="meme-section">
            <div className="meme-image-container" id="domEl" ref={domEl}>
                <div className="meme-image" style={{backgroundImage:`url(${meme.randomImage})` , backgroundRepeat:'no-repeat' , backgroundSize:'contain' , width:`${meme.width}`}}>
                <Draggable bounds="parent">
                <h2 className="meme-text top draggable" /*{...bindTopPos()} style={{position: "relative", top: topPos.y , left: topPos.x}}*/>{meme.topText}</h2>
                </Draggable>
                <Draggable bounds="parent">
                <h2 className="meme-text bottom draggable">{meme.bottomText}</h2>
                </Draggable>
            </div>
            </div>
            <div className="other-side">
                <div className="input-field">
                    <div className="rdn-meme"><button onClick={getMemeImage} className="rdn-btn css-button-3d--black">Generate Random Meme</button></div>
                </div>
                <div className="text-input text-top">
                    <input maxLength="30" autoComplete="off" type="text" placeholder="Top text" className="form-input" name="topText"
                        value={meme.topText} onChange={handleChange} />
                <div className="text-input text-bottom">
                    <input maxLength="30" autoComplete="off" type="text" placeholder="Bottom text" className="form-input" name="bottomText"
                        value={meme.bottomText} onChange={handleChange} />
                </div>
                </div>
                <div className="download-btn"><button className="dwn-btn css-button-3d--black css-button-sliding-to-left--black" onClick={downloadImage} id="download"
            >Download</button></div>
            </div>
        </div>
        <div className="footer-section">
            Made with ❤️ by <a href="https://www.linkedin.com/in/palash-chitnavis-83b109254/">Palash Chitnavis</a>
        </div>
        </div>
        </>
    )
}
export default Meme ;