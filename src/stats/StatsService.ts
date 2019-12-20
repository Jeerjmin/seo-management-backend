import { Injectable } from '@nestjs/common'
import * as moment from 'moment'

@Injectable()
export class StatsService {
  formatStats(feature, last, penult) {
    return last
      ? {
          value: last.details[feature] || 'N/A',
          lastValue: penult.details[feature] || 'N/A',
          createdAt: this.formatDate(last.createdAt),
        }
      : {
          value: 'N/A',
          lastValue: 'N/A',
          createdAt: 'Never',
        }
  }

  private formatDate(input?) {
    return moment(input).format('MM/DD/YYYY')
  }
}
