import { Validator } from 'infrastructure/validator/Validator'
import { BrokenLinkScanType } from 'analyzer/broken_links/BrokenLinkScanType'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BrokenLinkScanTypeValidator implements Validator {
  isValid(...args): boolean {
    const [scanType] = args
    const parsedScanType: BrokenLinkScanType = BrokenLinkScanType[scanType] as BrokenLinkScanType
    return !!parsedScanType
  }
}
