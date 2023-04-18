import React, { useEffect, useRef, useState } from 'react';
import { Page } from 'zmp-ui';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { BiPaperPlane } from 'react-icons/bi';
import { BiLoader } from 'react-icons/bi';
import { TbArrowDown } from 'react-icons/tb';
import Quiz from '../components/quiz';

const HomePage = () => {
  const [questLatest, setQuestLatest] = useState("");
  const [questList, setQuestList] = useState([]);
  const [quest, setQuest] = useState("");
  const [ansList, setAnsList] = useState([]);
  const [ans, setAns] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isCancelledRef = useRef(false);
  const isTouchingRef = useRef(false);

  const inputRef = useRef(null);
  const quizContentRef = useRef(null);
  const bottomPageRef = useRef(null);

  // Function to scroll to the bottom of the div
  const scrollToBottom = () => {
    // console.log(quizContentRef.current.onMouseDown)
    if (!isTouchingRef.current) {
      if (!isLoading) {
        quizContentRef.current.scrollTo({
          top: quizContentRef.current.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        quizContentRef.current.scrollTo({
          top: quizContentRef.current.scrollHeight,
          behavior: 'auto'
        });
      }
    } 
  };

  useEffect(() => {
    // Adjust the height of the input field on initial render and when the value changes
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }

    // Call the scrollToBottom function when the component mounts or when the content of the div updates
    console.log("construct")
    scrollToBottom();

    return () => {
      isCancelledRef.current = false;
    }
  }, []);

  const handleInputChange = (event) => {
    // Adjust the height of the input field when the value changes
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
    setQuest(event.target.value);
  };

  // Function to process the streamed response in chunks
  const processResponseChunks = async (response) => {
    const reader = response.body.getReader();
    let chunk = '';
    let content = ''; // Variable to store the accumulated content
  
    while (true) {
      // console.log(isCancelledRef.current);
      if (isCancelledRef.current) {
        break;
      }
      const { done, value } = await reader.read();
      if (done) break;

      const regex = /data: /g;
  
      // Convert the chunk from Uint8Array to string
      const chunkText = new TextDecoder().decode(value, {stream: true});
  
      // Append the chunk to the existing text
      chunk += chunkText;
  
      // Split the chunk into sentences based on punctuation marks
      // const sentences = chunk.split(regex);

      console.log(chunk)
      const sentences = chunk.match(/{"content": ".*?"}/g);
      console.log(sentences)
      // if (sentences.startsWith("event: ping")) continue;

      // Process each sentence
      if (sentences) {
        for (let i = 0; i < sentences.length - 1; i++) {
          const sentence = sentences[i];
          if (sentence !== '') {
            // Append the sentence to the accumulated content
            // content += JSON.parse(sentence).choices[0].delta.content;
            // setAns(content);
            // console.log(JSON.parse(sentence).choices[0].delta.content);

            try {
              content += JSON.parse(sentence).content;
              setAns(content);
              // console.log(isTouchingRef.current);
              console.log([sentences, sentence]);
            } catch (err) {
              // console.log([sentences, sentence])
              continue;
            }
          }
        }
        scrollToBottom()
    
        // Update the remaining chunk with the last incomplete sentence
        chunk = sentences[sentences.length - 1];
      }
    }
  
    // Add the remaining chunk to the accumulated content
    // content += chunk.trim() + ' ';
  
    // Return the accumulated content
    let aList = ansList;
    aList.push(content.trim());
    // console.log([ans, aList])
    setAnsList(aList);
    setIsLoading(false);
    // console.log(content.trim())
    // return content.trim();
  };

  const handleSubmit = async () => {
    isTouchingRef.current = false
    isCancelledRef.current = false
    setAns("")
    setQuest("")
    setQuestLatest(quest);
    setIsLoading(true);
    let qList = questList;
    qList.push(quest);
    setQuestList(qList);
    console.log(questList);
    var raw = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": quest
        }
      ],
      "max_tokens": 50,
      "temperature": 0.5,
      "stream": true
    });
    // https://free.churchless.tech/v1/chat/completions
    // fetch("https://free.churchless.tech/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: raw
    // })
    //   .then(response => processResponseChunks(response))
    //   .catch(error => console.log('error', error));
    fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: quest
      })
    })
      .then(response => processResponseChunks(response))
      // .then(response => response.text())
      // .then(data => console.log(data))
      .catch(error => {
        console.log('error', error)
        setIsLoading(false)
      });
  }

  const handleStop = () => {
    console.log("cancel")
    isCancelledRef.current = true;
  }

  const handleDown = () => {
    // console.log("down")
    isTouchingRef.current = true;
    // console.log(isTouchingRef.current);
  }

  const handleBottomPage = () => {
    isTouchingRef.current = false;
    scrollToBottom();
  }

  const handleScroll = () => {
    if (bottomPageRef && quizContentRef) {
      // console.log(quizContentRef.current.scrollTop, quizContentRef.current.scrollHeight, quizContentRef.current.offsetHeight)
      if (quizContentRef.current.scrollTop + quizContentRef.current.offsetHeight < quizContentRef.current.scrollHeight - 80) {
        isTouchingRef.current = true;
        bottomPageRef.current.style.display = 'flex';
      } else if (quizContentRef.current.scrollTop + quizContentRef.current.offsetHeight > quizContentRef.current.scrollHeight - 2) {
        bottomPageRef.current.style.display = 'none';
        setTimeout(() => {
          isTouchingRef.current = false;
        }, 200);
      }
    }
  }

  return (
    <Page 
      onPointerDown={handleDown}
      className='default'
    >
      <div className='d-flex flex-row align-items-center justify-content-center row-header'>
        <a href="https://www.facebook.com/planxdev">
          <div className='logo-company'></div>
        </a>
        <div className="text-center">
          GPT Free
        </div>
      </div>
      <div className='container' style={{ padding: '0px' }}>
        <div 
          ref={quizContentRef} 
          onScroll={handleScroll}
          className='container-fluid quiz-content'
        >
          {questList.map((item, index) => {
            if (index == questList.length - 1) return;
            else return (
              <Quiz key={index} quest={questList[index]} ans={ansList[index]}></Quiz>
            )
          })}
          {(questLatest=="")? <></> : <Quiz current={isLoading? "current-quiz" : ""} quest={questLatest} ans={ans}></Quiz>}
          
        </div>
        <div className='footer row'>
          <InputGroup className="p-0">
            <Form.Control
              as="textarea"
              rows={1}
              className='input-textarea'
              placeholder='...'
              value={quest}
              onChange={handleInputChange}
            />
            <Button 
              className='button-submit'
            >
              {isLoading? <BiLoader className='is-loading' onClick={handleStop} /> : <BiPaperPlane onClick={handleSubmit}/>}
            </Button>
          </InputGroup>
        </div>
      </div>
      <div ref={bottomPageRef} className='bottom-page' onClick={handleBottomPage}>
        <TbArrowDown />
      </div>
    </Page>
  );
}

export default HomePage;