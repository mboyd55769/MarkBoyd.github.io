function FilterData() {
  event.preventDefault();
  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);
  var table = document.getElementById('pitchTable');

  // Loop through all rows in the table (skip the header)
  for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      var rowDate = new Date(row.cells[1].textContent); // Assuming the date is in the second column (index 1)

      // Show or hide the row based on date range
      if (rowDate >= startdate && rowDate <= enddate) {
          row.style.display = ''; // Show the row
      } else {
          row.style.display = 'none'; // Hide the row
      }
  }
}

async function fetchData() {
  try {
      const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson/1');
      const data = await response.json();

      const table = document.getElementById('pitchTable');
      data.forEach(pitch => {
          const row = table.insertRow();
          const cellPitchNo = row.insertCell(0);
          const cellDate = row.insertCell(1);
          const cellTime = row.insertCell(2);
          const cellBatter = row.insertCell(3);
          const cellBalls = row.insertCell(4);
          const cellStrikes = row.insertCell(5);
          const cellOuts = row.insertCell(6);
          const cellPitchCall = row.insertCell(7);
          const cellKorBB = row.insertCell(8);
          const cellRelSpeed = row.insertCell(9);
          const cellSpinRate = row.insertCell(10);
          const cellSpinAxis = row.insertCell(11);

          cellPitchNo.innerHTML = `<a href="details.html">Pitch ${pitch.PitchNo}</a>`;
          cellDate.textContent = pitch.Date;
          cellTime.textContent = pitch.Time;
          cellBatter.textContent = pitch.Batter;
          cellBalls.textContent = pitch.Balls;
          cellStrikes.textContent = pitch.Strikes;
          cellOuts.textContent = pitch.Outs;
          cellPitchCall.textContent = pitch.PitchCall;
          cellKorBB.textContent = pitch.KorBB;
          cellRelSpeed.textContent = pitch.RelSpeed;
          cellSpinRate.textContent = pitch.SpinRate;
          cellSpinAxis.textContent = pitch.SpinAxis;
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

fetchData();