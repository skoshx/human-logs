import { describe, expect, it } from "vitest"
import { mockErrors } from "./test-mocks"

describe("formatters", () => {
  it("default formatter", () => {
    expect(
      mockErrors(["fetch_posts_failed", "missing_params", "provide_fallback"], {
        paramName: "image",
        paramType: "Image",
        postId: "abcd-123",
      }).toString()
    ).toBe(
      [
        "Fetching posts failed because the Image `image` is missing for post with ID `abcd-123`, and no fallback was provided.",
        "",
        "Solutions:",
        "1) add a fallback to your parameter definition like this: ",
        "",
        "url(`image`, { fallback: `https://useflytrap.com` })",
      ].join("\n")
    )
  })
})

describe("chaining", () => {
  it("add > no params", () => {
    const error = mockErrors(
      ["fetch_posts_failed", "missing_params", "provide_fallback"],
      {
        paramName: "image",
        paramType: "Image",
        postId: "abcd-123",
      }
    ).add(["check_statuspage"], {})

    expect(error.toString()).toBe(
      [
        "Fetching posts failed because the Image `image` is missing for post with ID `abcd-123`, and no fallback was provided.",
        "",
        "Solutions:",
        "1) add a fallback to your parameter definition like this: ",
        "",
        "url(`image`, { fallback: `https://useflytrap.com` })",
        "2) you can check the status of our services on our status page",
      ].join("\n")
    )
  })

  it("add > with params", () => {
    const error = mockErrors(
      ["fetch_posts_failed", "missing_params", "provide_fallback"],
      {
        paramName: "image",
        paramType: "Image",
        postId: "abcd-123",
      }
    ).add(["unsupported_blocktype"], {
      blockType: "Video",
    })

    expect(error.toString()).toBe(
      [
        "Fetching posts failed because the Image `image` is missing for post with ID `abcd-123`, and no fallback was provided and unsupported block type `Video` is included on this page.",
        "",
        "Solutions:",
        "1) add a fallback to your parameter definition like this: ",
        "",
        "url(`image`, { fallback: `https://useflytrap.com` })",
      ].join("\n")
    )
  })

  it("override > no params", () => {
    const error = mockErrors(
      ["fetch_posts_failed", "missing_params", "provide_fallback"],
      {
        paramName: "image",
        paramType: "Image",
        postId: "abcd-123",
      }
    ).override(["check_statuspage"], {})

    expect(error.toString()).toBe(
      [
        "Solutions:",
        "1) you can check the status of our services on our status page",
      ].join("\n")
    )
  })

  it("override > with params", () => {
    const error = mockErrors(["check_statuspage"], {}).override(
      ["unsupported_blocktype"],
      {
        blockType: "Image",
      }
    )

    expect(error.toString()).toBe(
      ["unsupported block type `Image` is included on this page."].join("\n")
    )
  })
})
