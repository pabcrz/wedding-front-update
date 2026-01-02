// src/components/MyChart.jsx
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function MyChart({ man, woman, boys, girls, onCategoryClick, selectedCategory }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      color: ["#FF6B6B", "#4ECDC4"],
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Invitados",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            backgroundColor: "#F6F8FC",
            borderColor: "#8C8D8E",
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: "#6E7079",
                lineHeight: 22,
                align: "center",
              },
              hr: {
                borderColor: "#8C8D8E",
                width: "100%",
                borderWidth: 1,
                height: 0,
              },
              b: {
                color: "#4C5058",
                fontSize: 14,
                fontWeight: "bold",
                lineHeight: 33,
              },
              per: {
                color: "#fff",
                backgroundColor: "#4C5058",
                padding: [3, 4],
                borderRadius: 4,
              },
            },
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: man, name: "Hombres" },
            { value: girls, name: "Niñas" },
            { value: boys, name: "Niños" },
            { value: woman, name: "Mujeres" },
          ].filter(item => item.value > 0), // Filtrar categorías con 0 invitados
        },
      ],
    };

    myChart.setOption(option);

    // Agregar event listener para clicks
    myChart.on("click", (params) => {
      if (params.componentType === "series" && onCategoryClick) {
        onCategoryClick(params.name);
      }
    });

    // Limpieza en caso de desmontaje del componente
    return () => {
      myChart.dispose();
    };
  }, [man, woman, boys, girls, onCategoryClick, selectedCategory]);

  return (
    <div
      id="main"
      ref={chartRef}
      style={{ width: "70%", height: "400px" }}
      className="hidden md:block"
    />
  );
}
