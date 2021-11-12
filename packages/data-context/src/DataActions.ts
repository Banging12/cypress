import type { DataContext } from '.'
import { AppActions, ApplicationDataActions, ElectronActions, FileActions, ProjectActions } from './actions'
import { AuthActions } from './actions/AuthActions'
import { DevActions } from './actions/DevActions'
import { cached } from './util'

export class DataActions {
  constructor (private ctx: DataContext) {}

  @cached
  get applicationData () {
    return new ApplicationDataActions(this.ctx)
  }

  @cached
  get file () {
    return new FileActions(this.ctx)
  }

  @cached
  get dev () {
    return new DevActions(this.ctx)
  }

  @cached
  get app () {
    return new AppActions(this.ctx)
  }

  @cached
  get auth () {
    return new AuthActions(this.ctx)
  }

  @cached
  get project () {
    return new ProjectActions(this.ctx)
  }

  @cached
  get electron () {
    return new ElectronActions(this.ctx)
  }
}
