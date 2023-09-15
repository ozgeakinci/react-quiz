import React from "react";

const Progress = ({
  index,
  numQuestions,
  points,
  maxPointsProgress,
  answer,
}) => {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        // burada + dan sonra Number ile tanımladığımız yer true veya false olarak dönecek yer eğer cevap yoksa sonuç 0 olacak ve index olduğu yerde kalacak eğer cevap varsa 1'e dönüşecek ve index 1 artık progress tıklandığı anda ilerleyecek

        value={index + Number(answer !== null)}
      />
      <p>
        <strong>
          Questions {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPointsProgress}
        </strong>
      </p>
    </header>
  );
};

export default Progress;
