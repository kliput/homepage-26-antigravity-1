/**
 * Strips minor component from Onedata version string (eg. 21.02.4 -> 21.02, 25.0 -> 25)
 *
 * @author Jakub Liput
 * @copyright (C) 2024 ACK CYFRONET AGH
 * @copyright (C) 2025-2026 Onedata (onedata.org)
 * @license This software is released under the MIT license cited in 'LICENSE.txt'.
 */

type LegacyMajorVersion = "18.02" | "19.02" | "20.02" | "21.02";
export type MajorVersion = LegacyMajorVersion | `${number}`;

export default function stripVersion(version: string): MajorVersion {
  const firstNumber = Number(version.split(".")[0]);
  if (firstNumber > 21) {
    return String(firstNumber) as `${number}`;
  } else {
    const legacyMatch = version.match(/^\d+\.\d+/);
    if (
      legacyMatch?.[0] === "20.02" ||
      legacyMatch?.[0] === "21.02" ||
      legacyMatch?.[0] === "19.02" ||
      legacyMatch?.[0] === "18.02"
    ) {
      return legacyMatch[0];
    }
    throw new Error(`Unsupported version "${version}" (stripping to major)`);
  }
}
