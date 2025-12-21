
<template>
  <div class="card timetable-card">
    <h3>Timetable</h3>
    <table class="timetable-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Event</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10:00</td>
          <td>Doors Open</td>
        </tr>
        <tr>
          <td>12:00</td>
          <td>First Tournament</td>
        </tr>
        <tr>
          <td>15:00</td>
          <td>Lunch Break</td>
        </tr>
        <tr>
          <td>18:00</td>
          <td>Finals</td>
        </tr>
        <tr>
          <td>22:00</td>
          <td>Event Ends</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Timetable',
  // TODO: Move logic from timetable.js here as methods/composables
}
</script>


<style scoped>
.timetable-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
}
.timetable-table th, .timetable-table td {
  border: 1px solid #374151;
  padding: 8px 12px;
  text-align: left;
}
.timetable-table th {
  background: #1e293b;
}
</style>
