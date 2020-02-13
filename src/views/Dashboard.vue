<template>
  <div class="dash">
    <h1 class="text-center">Dashboard</h1>
    <v-container class="my-5">
      <v-row class="mb-3">
        <div id="chartContainer"></div>
      </v-row>
    </v-container>
  </div>
</template>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

<script>
import db from "@/fb";

export default {
  name: "Dash",
  mounted: async function() {
    
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
        this.chartOptions.data[0].dataPoints = this.projects.map(p => ({
            x: new Date(p.due.toDate().toDateString()),
            y: p.yAxis
          }));
      });
      this.render();
    });
    
    console.log(this.chartOptions);
  },
  data: () => ({
    projects: [],
    chartOptions: {
      title: {
        text: "CanvasJS Chart in Vue.js"
      },
      axisX: {
        title: "Time"
      },
      axisY: {
        title: "Projects"
      },
      animationEnabled: true,
      data: [
        {
          type: "column",
          yValueFormatString: "#,###",
          dataPoints: []
        }
      ]
    }
  }),
  methods:{
    render(){
      this.chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
      this.chart.render()
    }
  }
  
};
</script>
<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2 !important;
}
.v-chip.ongoing {
  background: #ffaa2c !important;
}
.v-chip.overdue {
  background: #f83e70 !important;
}
</style>
