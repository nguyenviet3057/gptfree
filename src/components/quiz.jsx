import React, { useEffect, useRef, useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import { CgChevronDoubleUp } from 'react-icons/cg';

const Quiz = (props) => {
    const { current, quest, ans } = props;
    const [isLong, setIsLong] = useState(false);
    const answerRef = useRef(null);

    // useEffect(() => {
    //     if (answerRef) {
    //         console.log(answerRef.current.offsetHeight)
    //     }
    // }, []);

    // const checkLong = async () => {
    //     console.log("resized")
    //     if (answerRef) {
    //         console.log(answerRef.current.offsetHeight)
    //         if (answerRef.current.offsetHeight > 200) {
    //             console.log("long")
    //             setIsLong(true);
    //         }
    //     }
    // }

    const handleShort = () => {
        if (answerRef) {
            answerRef.current.style.height = 100 + "px";
        }
    }

    return (
        <Card className='card-quiz' onResize={() => console.log("???")}>
            <Row className='row-quiz'>
                {quest}
            </Row>
            <Row ref={answerRef} className='answer row-quiz'>
                <p className={current}>{ans}</p>
            </Row>
            {/* <Row onClick={handleShort} style={(isLong)? {display: 'block'} : {display: 'none'}} className='p-2 answer'>
                <CgChevronDoubleUp className='short-answer'/>
            </Row> */}
        </Card>
    );
}

export default Quiz;
