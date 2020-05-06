

<canvas id="myLinechart" width="3" height="1"></canvas>

<script>

    import { afterUpdate } from 'svelte';
    import Chart from 'chart.js';

    export let data;

    let ctx;
    let myChart;

    function createLinechart() {
        ctx = document.getElementById("myLinechart");
        if (myChart) {

        } else {
            myChart = new Chart(
                ctx,
                {
                    "type":"line",
                    "data":{
                        "labels":["January","February","March","April","May","June","July"],
                        "datasets":[
                            {"label":"My First Dataset",
                            "data":data,
                            "fill":false,
                            "borderColor":"rgb(75, 192, 192)",
                            "lineTension":0.1}
                        ]
                    },
                    "options":{}
                });
        }
    };

    afterUpdate(createLinechart);
</script>