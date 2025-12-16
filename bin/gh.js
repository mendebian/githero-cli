#!/usr/bin/env node
import { showBanner } from '../src/ui/banner.js'
import { mainMenu } from '../src/ui/menu.js'

showBanner()
await mainMenu()
