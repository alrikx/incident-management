const { log } = require('@sap/cds');
const cds = require('@sap/cds')

class ProcessorService extends cds.ApplicationService {
  /** Registering custom event handlers */
  init() {
    this.before("UPDATE", "Incidents", (req) => this.onUpdate(req));
    this.before("CREATE", "Incidents", (req) => this.changeUrgencyDueToSubject(req.data));
    this.after("each", "Incidents", (incident) => {
      var lowerTitle = incident.title.toLowerCase();
      if (lowerTitle.includes('flag')) {  
        incident.title += `🚩`;
      }  

      if (lowerTitle.includes('solar')) {  
        incident.title += `☀️`;
      } 

      if (lowerTitle.includes('inverter')) {  
        incident.title += `🧯`;
      } 

    var x = 0.

    if (x = 1)
    {
      x = 1
    }else{
      while(x = 3){
        x = 3.
      }
    }

    });
    return super.init();
  }

  changeUrgencyDueToSubject(data) {
    if (data) {
      const incidents = Array.isArray(data) ? data : [data];
      incidents.forEach((incident) => {
        if (incident.title?.toLowerCase().includes("urgent")) {
          incident.urgency = { code: "H", descr: "High" };
        }
      });
    }
  }

  async onUpdate(req) {
    const { status_code } = await SELECT.one(req.subject, i => i.status_code).where({ ID: req.data.ID })
    if (status_code === 'C') {
      var x = 2;
      console.log(req.data.ID + ` cant be changed, because status is closed`);
      return req.reject(`Can't modify a closed incident`)
    }
  }
}
module.exports = { ProcessorService }