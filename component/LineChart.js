'use client'; // 클라이언트 컴포넌트로 설정

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ result }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // 음식별로 먹은 횟수를 집계
    const countByTitle = result.reduce((acc, post) => {
      acc[post.title] = (acc[post.title] || 0) + 1; // 각 title의 카운트를 증가
      return acc;
    }, {});

    // 내림차순으로 정렬
    const sortedData = Object.entries(countByTitle).sort((a, b) => b[1] - a[1]);

    // X축에는 음식 이름, Y축에는 먹은 횟수
    const labels = sortedData.map(item => item[0]);
    const data = sortedData.map(item => item[1]);

    // 음식마다 다른 색상 설정
    const backgroundColors = labels.map((_, index) =>
      `hsl(${index * 50}, 70%, 70%)` // hsl 색상 모델을 사용하여 각 바의 색상 설정
    );

    const borderColors = labels.map((_, index) =>
      `hsl(${index * 50}, 70%, 50%)` // hsl 색상 모델을 사용하여 테두리 색상 설정
    );

    setChartData({
      labels,
      datasets: [
        {
          label: '먹은 횟수',
          data,
          backgroundColor: backgroundColors, // 음식마다 다른 색상
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    });
  }, [result]);

  if (!chartData) return <div>Loading...</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '음식 섭취 횟수 (많이 먹은 순서)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '음식 이름',
          font: {
            size: 16, // 글씨 크기 설정
            weight: 'bold', // 글씨 굵게
          },
          color: 'black', // 글씨 색상 설정
        },
      },
      y: {
        title: {
          display: true,
          text: '먹은 횟수',
          font: {
            size: 16, // 글씨 크기 설정
            weight: 'bold', // 글씨 굵게
          },
          color: 'black', // 글씨 색상 설정
        },
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
