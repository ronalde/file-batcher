const fs = require('fs')
const readFile = require('./')
const { path, markdown, markdownJSON } = require('../../fixtures/shapes')
const createFiles = require('../../fixtures/create-files')

jest.mock('fs', () => new (require('metro-memory-fs'))())

// Populate the `createFiles` with the mocked `fs`
const mockFiles = createFiles(fs)

describe('readFile', () => {
  beforeEach(() => {
    fs.reset()
    mockFiles({
      [path]: {
        'foo.md': markdown
      }
    })
  })

  it('should read a file and parse its contents into JSON', () => {
    const actual = readFile('fixtures/test-content/articles/foo.md')
    const expected = markdownJSON()

    expect(actual).toEqual(expected)
  })
})
