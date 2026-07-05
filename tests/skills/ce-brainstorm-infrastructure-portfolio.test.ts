import { existsSync, readFileSync } from "fs"
import path from "path"
import { describe, expect, test } from "bun:test"

const REPO_ROOT = process.cwd()
const BRAINSTORM_DIR = path.join(REPO_ROOT, "skills", "ce-brainstorm")

function readRepoFile(...parts: string[]): string {
  return readFileSync(path.join(REPO_ROOT, ...parts), "utf8")
}

describe("ce-brainstorm infrastructure portfolio discovery", () => {
  test("loads a demand-detective reference for infrastructure portfolio requests", () => {
    const skill = readRepoFile("skills", "ce-brainstorm", "SKILL.md")

    expect(skill).toContain("references/demand-detective.md")
    expect(skill).toContain("Infrastructure Portfolio Discovery")
  })

  test("demand-detective reference covers on-prem, cloud, and operations infrastructure", () => {
    const referencePath = path.join(BRAINSTORM_DIR, "references", "demand-detective.md")
    expect(existsSync(referencePath)).toBe(true)

    const reference = readFileSync(referencePath, "utf8")

    for (const requiredText of [
      "VMware",
      "vSphere",
      "ESXi",
      "Hyper-V",
      "Proxmox VE",
      "Pure Storage",
      "PowerStore",
      "SAN",
      "FC",
      "iSCSI",
      "AWS VPC",
      "GCP VPC",
      "Site-to-Site VPN",
      "FortiGate",
      "F5 BIG-IP",
      "Exchange",
      "Active Directory",
      "SQL Always On",
      "RHEL",
      "Windows Server",
      "Veeam",
      "NetBackup",
      "Backup / DR",
      "HA",
      "Migration",
      "Upgrade",
      "Patching",
      "Infrastructure Deployment",
    ]) {
      expect(reference).toContain(requiredText)
    }

    expect(reference).toContain("L1 - Portfolio Boundary")
    expect(reference).toContain("L2 - Architecture and Lifecycle")
    expect(reference).toContain("L3 - Operational Rule")
    expect(reference).toContain("L4 - Experience and Reporting")
    expect(reference).toContain("Decision Log")
    expect(reference).toContain("Confirmed Requirements")
    expect(reference).toContain("Assumption-backed Requirements")
  })

  test("product pressure test includes infrastructure-specific gap lenses", () => {
    const pressureTest = readRepoFile(
      "skills",
      "ce-brainstorm",
      "references",
      "product-pressure-test.md",
    )

    expect(pressureTest).toContain("Infrastructure / platform portfolio")
    expect(pressureTest).toContain("Boundary gap")
    expect(pressureTest).toContain("Lifecycle gap")
    expect(pressureTest).toContain("Operational ownership gap")
    expect(pressureTest).toContain("Failure-path gap")
  })

  test("brainstorm section contract allows infrastructure discovery outputs", () => {
    const sections = readRepoFile(
      "skills",
      "ce-brainstorm",
      "references",
      "brainstorm-sections.md",
    )

    expect(sections).toContain("Infrastructure Scope")
    expect(sections).toContain("Decision Log")
    expect(sections).toContain("Confirmed Requirements")
    expect(sections).toContain("Assumption-backed Requirements")
    expect(sections).toContain("Operational Acceptance Criteria")
  })
})
