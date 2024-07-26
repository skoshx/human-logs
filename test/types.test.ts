import { describe, it } from "vitest"
import { mockErrors } from "./test-mocks"

describe("basic type tests", () => {
  it("only valid keys", () => {
    mockErrors(["check_statuspage", "fetch_posts_failed"], {})
    // @ts-expect-error
    mockErrors(["check_statuspage", "invalid"], {})
  })

  it("correct params", () => {
    mockErrors(["fetching_page_contents_failed"], {
      pageId: "test-page-id",
    })

    mockErrors(["fetching_page_contents_failed"], {
      // @ts-expect-errors
      wrongParam: "test-page-id",
    })

    // @ts-expect-errors
    mockErrors(["fetching_page_contents_failed"], {})

    mockErrors(["missing_params", "fetching_page_contents_failed"], {
      pageId: "",
      paramName: "image",
      paramType: "Image",
      postId: "abcd-123",
    })

    // @ts-expect-error
    mockErrors(["missing_params", "fetching_page_contents_failed"], {
      paramName: "image",
      paramType: "Image",
      postId: "abcd-123",
    })
  })
})
