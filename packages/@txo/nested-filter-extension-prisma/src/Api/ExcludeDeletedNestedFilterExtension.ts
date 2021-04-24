/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-04-18T15:04:77+02:00
 * @Copyright: Technology Studio
**/

import { Extension, ExtensionOptions, Condition } from '@txo-peer-dep/nested-filter-prisma'

type Options = {
  excludeDeleted?: boolean,
}

declare module '@txo-peer-dep/nested-filter-prisma' {
  interface ExtensionOptions {
    excludeDeleted: boolean,
  }
}

export class ExcludeDeletedNestedFilterExtension implements Extension {
  _defaultOptions?: Options
  constructor (defaultOptions?: Options) {
    this._defaultOptions = defaultOptions
  }

  populateConditionList = (conditionList: Condition[], extensionOptions?: ExtensionOptions): void => {
    if (extensionOptions?.excludeDeleted ?? this._defaultOptions?.excludeDeleted) {
      conditionList.push({
        deletedDateTime: null,
      })
    }
  }
}
