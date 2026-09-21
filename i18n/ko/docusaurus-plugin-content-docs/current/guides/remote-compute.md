---
title: "SSH 호스트 및 Slurm 설정"
last_update:
  date: '2026-09-10'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# SSH 호스트 및 Slurm 설정 {/* #ssh-hosts-and-slurm-setup */}

:::정보&#91;일보&#93; SSH 호스트를 구성하고 Direct SSH 또는 Slurm을 원격 작업 제출하기 전에 선택합니다. 저장된 호스트 프로파일은 성공적인 인증 또는 실행을 설정하지 않습니다. :::

**Settings → Compute**을 사용하여 서버 또는 클러스터를 등록하십시오. 호스트 등록, 대화에 사용할 수 있으며 작업 완료는 별도의 이정표입니다. 사이트 로그인 노드 규칙 및 스케줄러 요구 사항을 호스트 노트로 유지하십시오.

## 작업 실행을 선택 {/* #choose-where-jobs-execute */}

| 실행 모드 | 작업 실행 | 명령 호출 | 적합한 환경 |
| --- | --- | --- | --- |
| **Direct SSH** | SSH 로그인 호스트에 직접 | SSH 로그인 호스트 | 직접적인 workloads가 허용되는 기계 |
| **Slurm** | Slurm을 통한 제출 및 관리 | SSH 로그인 호스트에 여전히 | 예정된 할당을 요구하는 클러스터 |

Slurm 선택은 모든 명령을 컴파일 노드에 이동하지 않습니다. 로그인 호스트 CPU, RAM 또는 GPU 정보를 미래의 Slurm 작업에 할당된 리소스로 해석하지 마십시오. 결과를 해석하기 전에 작업의 실제 할당을 검사합니다.

## 연결 추가 {/* #add-the-connection */}

**Add SSH host**을 선택합니다. 기존의 별명을 선택하거나 호스트 식별자를 입력합니다. SSH 구성 인증 및 Direct SSH 실행에 기본 양식입니다.

| 분야 또는 통제 | 입력 및 효과 |
| --- | --- |
| **From ~/.ssh/config** | 발견 된 별명을 선택하십시오; aliases가 사용할 수 없는 경우 |
| **Or type a host alias** | 필수 호스트 / 별, 1–255 문자 트리밍 후; NUL 또는 라인 브레이크 없음 |
| 옵션 호스트 노트 | Scheduler 규칙, 파티션 / 계정, 모듈, 패키지 설치 정책 및 환경 위치; 최대 32,768 문자 |
| **Execution mode** | Direct SSH 또는 Slurm; 호스트 당 저장 |
| **SSH configuration** | 연결 설정 해결 `ssh -G`; 기존 SSH 구성, 키 또는 시약 사용 |
| **Advanced settings → User** | 선택적인 override; 공백은 SSH 해결책을 보존합니다 |
| **Port** | SSH 구성에 대 한 선택; 공급되는 경우에, 정수 1–65535 |
| **Identity file** | 선택적인 열쇠 파일 override; 공백은 윤곽/시약 행동을 이용합니다 |
| **Username and password** | 사용자, 항구 및 암호를 요구합니다; 열쇠 또는 시약을 사용하지 않습니다 |
| **Cancel** | 양식을 등록하지 않고 남겨 |
| **Add** | 유효한 연결을 제출하십시오; 비밀번호 인증은 호스트가 추가되기 전에 연결 테스트를 통과해야 합니다. |

![영어 SSH 구성 overrides](/img/open-science/walkthrough-2026-09-08/53-ssh-advanced.webp)

![실제 양식에서 선택된 비밀번호 인증 및 Slurm](/img/open-science/walkthrough-2026-09-08/52-ssh-password-slurm.webp)

비밀번호 모드는 애플리케이션의 비밀번호 유지 관리 및 보안 저장 기능에 따라 다릅니다. 사용할 수없는 경우, 양식에 표시된 이유를 검사합니다. 해당 분야에서의 자격 증명을 입력하고, 호스트 노트 또는 에이전트 요청에서 아닙니다.

SSH 구성 호스트의 경우, 앱은 레코드를 생성하고 세부보기를 열고 배경 프로브를 시작합니다. 추가된 행은 그러므로 인증 또는 compute readiness를 증명하지 않습니다. 작업이 사용되기 전에 프로브 결과를 읽으십시오.

### 비밀번호 보호 연구 서버 연결 {/* #connect-a-password-protected-research-server */}

1. **Settings → Compute → Add SSH host**을 엽니다. 서버 주소 또는 별명을 입력합니다.
2. **Username and password**을 선택하면 **User**, **Port** 및 **Password**를 입력하고 **Add**를 선택하십시오. 관리자에 의해 공급되는 포트를 사용하십시오; 예제 서버는 포트 22을 사용합니다.
3. 앱이 **The SSH host key is unknown. Verify it in a terminal before connecting.**을 보고하면 호스트 신뢰를 먼저 설정한다. 시스템 SSH 클라이언트와 동일한 호스트와 포트에 연결, 관리자의 지문으로 표시된 지문을 비교하고, 그들이 일치 할 때만 받아들입니다. 앱과 리트리 **Add**로 돌아갑니다. 메시지를 해소하기 위해 호스트 키 검사를 비활성화하지 마십시오.
4. **Last probe succeeded**에 대한 대기. **Configuration**에서 **Credential configured**, 인증 방법 및 최종 검증 시간을 확인하십시오. 저장된 암호는 **Configured · cannot be viewed**를 표시하고 있습니다.
5. 기존의 연결을 확인하거나 변경하려면 **Configuration → Edit**을 열고 **Test and save**을 사용하십시오. 인증 변경 전에 통지를 읽으십시오 : 세션 활성화 및 권한 부여는 새로운 구성이 최선을 다할 때 명확합니다. 예정된 세션을 위한 호스트를 다시 사용할 수 있습니다.

영어 예제는 성공적인 암호 전용 프로브를 보여줍니다 : 256 CPU, 504 GB RAM, NVIDIA A100 80GB PCIe 및 감지 된 Slurm 스케줄러. 설정된 모드는 **Direct SSH**을 명시적으로 변경할 때까지 남아 있습니다. 이 서버의 로그인 호스트 리소스는 최소 요구 사항이나 예정된 할당이 아닙니다. 호스트 및 계정 식별자는 스크린 샷에서 obscured.

![성공적인 비밀번호 인증 및 호스트 리소스 프로브](/img/open-science/remote-compute/03-host-probe.webp)

## Inspect 및 호스트 세부 정보 유지 {/* #inspect-and-maintain-host-details */}

| 단면도 또는 단추 | 자주 묻는 질문 |
| --- | --- |
| **Probe** / **Retry probe** | 연결/출원 탐지를 상쾌하게 하십시오; 프로브, Probing, Last probe가 성공하고 Probe가 실패하지 않음 |
| **Resources** / **Login host resources** | CPU, 메모리, GPU 및 스케줄러 정보 감지; 스케줄러 할당은 별도의 용량이 있습니다. |
| **Configuration → Edit** | 인증 설정 및 현재 자격 상태 검사 |
| **Test and save** | 인증 구성을 저장하기 전에 테스트; 변경된 구성은 세션 활성화 및 권한 부여를 취소합니다. 변경되지 않은 구성 보고서 그 설정은 이미 날짜까지 |
| **Execution mode → Edit → Save** | 구성 모드 변경; 검출된 스케줄러와 비교 |
| **Details → Edit** | host-specific 지시를 업데이트하십시오; 저장 명령, 취소 discards |
| **더보기 / 더보기** | 확장 또는 붕괴 긴 노트 |
| **Scratch root → Edit** | 원격 임시 작업 경로를 pinned 값으로 저장 |
| **Restore auto-detection** | pinned scratch override를 제거하십시오 그래서 미래 probing는 그것을 공급할 수 있습니다 |
| **Concurrent job limit → Edit** | 1에서 500로 정수를 설정; 표시된 기본값은 10입니다. |
| 호스트 제거 | 확인하기 전에 응용 프로그램의 제거 대화 상자 및 활성 작업 제한을 검토하십시오. |

스크래치 루트는 원격 호스트의 경로입니다. 그것은 당신의 노트북의 artifact 디렉토리가 아닙니다. 계정을 작성할 수 있고 사이트의 정리 정책은 결과를 수집하는 충분한 시간을 제공합니다. 동시 작업 한계는 스케줄러의 자신의 quotas 또는 리소스 제한을 대체하지 않습니다.

<span id="give-verification-jobs-their-own-scratch-directory" />

### 작업 스크래치 디렉토리 선택 {/* #choose-a-job-scratch-directory */}

**Scratch root → Edit**을 열고 서버에서 승인된 writable 절대 경로를 입력한 다음 **Save**을 입력하십시오. **PINNED**은 나중에 **Probe**을 의미하는 것은 당신의 선택을 보존합니다. 첫 번째 작업의 작업 디렉토리 및 출력을 검사하여 액세스를 작성하십시오.

첫 번째 실행을 위해 **Concurrent job limit → Edit**을 열고 **1**을 입력하고 **Save**를 선택합니다. 이 제한 앱 관리 작업에 이 호스트에 한 번에. CPU를 예약하지 않고 메모리 제한을 시행하거나 실행중인 작업에서 다른 사용자를 방지하지 않습니다. 제한을 낮추는 것은 기존의 일을 멈추지 않습니다. **Restore auto-detection**을 다시 스크래치 경로를 공급하기 위해 후속 프로브를 원할 때만 사용하십시오.

### 감지 된 리소스에서 별도의 호스트 지침을 유지 {/* #keep-host-instructions-separate-from-detected-resources */}

저장된 호스트 지침은 **Resources**의 독립적입니다. 성공적인 프로브는 설정 지침을 작성하지 않으며 빈 지침은 실패를 유발하지 않습니다. **Details**의 스케줄러 정책, 환경 활성화 및 재현 가능한 설정 단계 유지; 리소스에서 CPU / RAM / GPU 탐지를 읽으십시오.

에이전트 업데이트 지침이되면 저장 된 문서를 먼저 읽고 정확한 현재 내용을 대체해야합니다. 다른 편집이 변경된 경우, 재읽기 및 구부리기 전에 비교합니다. 대체된 문서로 프로브 요약을 사용하지 마십시오. [Host 교육 계약](https://github.com/aipoch/open-science/commit/04adfd61).

## 작업에 사용할 수 있는 호스트 만들기 {/* #make-a-host-available-to-a-task */}

대화의 **Agent controls**에서, Compute Host 가용성 및 선택 검사. 선택된 호스트도 활성화해야 합니다. 그렇지 않으면 로컬에서 실행할 수 있는 작업의 의도된 호스트 및 실행 모드를 이름을 지정합니다. 과학적 워크로드를 제출하기 전에 영수증, 로그 및 출력을 검사하기 위해 작은 첫 번째 원격 요청을 유지하십시오.

Slurm의 경우, 올바른 계정/출입, 자원 요청, 벽 시간, 클러스터 소유자의 모듈/환경 설정 및 스크래치 정책을 얻을 수 있습니다. `sbatch`, `squeue`, `sacct` 및 `scancel`의 가용성은 스케줄러 가동을 지원합니다; 자신의 존재는 제출 권한을 설정하지 않습니다.

## 연구 workload의 앞에 호스트 확인 {/* #check-a-host-before-a-research-workload */}

| 기본 정보 | 자주 묻는 질문 |
| --- | --- |
| 관련 링크 | 성공적인 프로브 및 정통 연결. |
| 자주 묻는 질문 | 작은 승인 된 작업, 그것의 출구 상태, 읽기 쉬운 로그 및 retrieved 출력. |
| Slurm 작업 | 스케줄러 영수증/작업 ID, 실제 할당, 최종 상태 및 검색 출력. |
| 재연결 후 복구 | 앱은 동일한 원격 작업을 재구성합니다. 그것은 중복을 제출하지 않았습니다. |
| 이름 &#42; | Scheduler/process는 그것을 멈추었습니다 확인합니다; cleanup의 앞에 유지된 산출을 검열하십시오. |
| GPU 작업 부하 | 필수 환경, 무게, 기억 및 과학적인 산출 체크, SSH 접근 이외에. |

**소스 리뷰:** [add-host 양식](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAddForm.tsx), [인증분야](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAuthenticationSection.tsx), [감사합니다.](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeHostDetail.tsx), [연결 유효성](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute-host-connection-profile.ts) 및 [세션 호스트 선택](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/session-configuration.ts).

<ToolOperationGroup>
<summary>원격 RNA-seq 품질 검사를 실행</summary>

## 원격 RNA-seq 품질 검사를 실행 {/* #run-a-remote-rna-seq-quality-check */}

<p className="example-label"><strong>실습 예제</strong> Direct SSH을 통해 RNA-seq 품질 검사를 실행</p>

당신의 노트북에서 서버로 분석할 때 동일한 공개 [GSE60450 카운트 매트릭스](../workflows/data-quality.md#source-and-input-contract)를 사용하십시오. 알려진 결과를 비교하면 과학적 방법의 변화에서 compute 구성 문제를 구별 할 수 있습니다.

1. 연구 프로젝트에서 대화를 만들고 원래의 카운트 매트릭스를 첨부합니다.
2. **Agent controls → Compute**을 엽니다. 호스트를 활성화하면 **실행 대상**에 추가합니다. 가용성과 선택은 분리된 통제입니다; 설정에서 호스트를 등록하면이 대화를 선택하지 않습니다.
3. **Direct SSH** 작업에 대한 질문, 입력 및 필요한 출력을 이름, 그리고 제한을 지정합니다. 이 예를 들어, 하나의 CPU 스레드를 사용, 1 GiB 메모리 천장과 120-second 런타임. 서버의 기본 Python은 충분합니다; 패키지 설치가 필요 없습니다.
4. **Allow remote job submission?**이 나타나면 **Host**, **Intent**, **Inputs**, **Execution mode**, **Timeout** 및 **Remote workdir**를 검사합니다. 전체 스크립트를 검사하기 위해 **Show full command**을 확장합니다. **Once** 이 제출을 승인; 더 넓은 범위는 그 후속 작업에 적용합니다. 범위 deliberately를 선택하십시오.
5. 반환된 **Job ID** 유지. 작업 칩 또는 **Background tasks**을 열고 작업을 검사합니다. 대화를 떠나는 동안 실행할 수 있습니다. 응답이 종료되기 때문에 다른 사본을 제출하지 마십시오.
6. 완료 후 **Remote job details**을 엽니다. **Status**, **Runtime**, **Job ID** 및 **Remote workdir**를 확인하십시오. 현재보기에 **Refresh**, **stdout** 또는 **stderr**를 사용하여 각 로그를 검사합니다. Remote-workdir 버튼은 작업의 원격 디렉토리를 엽니다.
7. 결과 수집 및 후속 응답을 대기하고, 게시 된 CSV 및 보고서를 엽니다. 성공적인 계산, 파일 수집 및 Artifact 간행물은 별도의 단계입니다. 완료된 작업은 자체가 예상된 파일이 출판되었는지 확인하지 않습니다.

예시 요청:

> 선택된 Direct SSH 호스트를 사용하여 첨부된 GSE60450 카운트 매트릭스에 descriptive QC를 실행합니다. 입력을 보존합니다. 각 샘플의 경우 총 계산, 제로 카운트 유전자, 검출 된 유전자 및 미디어 긍정적 인 수를 계산합니다. CSV 및 짧은 방법 보고서를 치수 및 이전 / 후 SHA-256로 저장하십시오. 1개의 CPU 실, 포장 임명 없음 및 120-second 런타임 한계를 사용하십시오. 제출 후 작업 ID를 반환; 출력을 수집하고 게시할 때 완료합니다. 계산을 정상화하거나 생물학적 결론을 만들지 마십시오.

**이름 &#42;** 및 종료 코드 **0** 후 앱이 출력을 수집하고 저장된 테이블과 보고서를 다시 열 수 있음을 확인합니다. [공유 baseline](../reference/example-data.md)을 가진 가득 차있는 표본 식별자 그리고 미터를 비교하고, 먼 계산 후에 입력 해시를 검사하십시오. 이 Direct SSH 예제는 그 체크를 통과했습니다.

![ID 및 작업 디렉토리에 Direct SSH 작업 완료](/img/open-science/remote-compute/05-direct-job-completed.webp)

![모든 12개의 표본을 가진 먼 RNA-seq QC 테이블을 Reopened](/img/open-science/remote-compute/06-remote-qc-table.webp)

예를 들어 <a href="/docs/examples/gse60450/remote-rnaseq-qc.csv" download>QC 테이블</a> 및 <a href="/docs/examples/gse60450/remote-rnaseq-qc-report.md" download>방법 보고서</a>을 다운로드하십시오. 이 원시 체크는 정상화, 실험 설계 검토 또는 차압 분석을 대체하지 않습니다. 긍정적 인 미디어는 Zeros를 제외합니다.

### 앱을 재시작한 후 작업으로 돌아가기 {/* #return-to-a-job-after-restarting-the-app */}

동일한 프로젝트와 대화를 열고 **Compute** 또는 작업의 **Background tasks** 항목을 사용하십시오. **Job ID**과 기존의 영수증을 비교하여 작업 수행하기 전에. 복원 작업은 기존의 원격 작업 부하입니다; 새로운 대화를 시작하거나 신속한 복구 단계가 아닙니다.

아래의 별도의 준비 체크 포인트는 로컬 앱이 재시작했을 때 실행되었습니다. 앱은 동일한 작업 ID를 복구하고 나중에 완료 로그를 수집했습니다. 대기는 일반적으로 끝냈습니다; 이 스크린 샷은 복구, 취소 또는 과학적 계산을 보여줍니다.

![같은 준비 작업은 응용 프로그램 재시작 후 복구](/img/open-science/remote-compute/07-job-recovered-after-restart.webp)

### 1개의 먼 일을 취소하십시오 {/* #cancel-one-remote-job */}

**Background tasks**을 열고, 의도한 일을 선택하고 영수증을 가진 **Job ID**를 비교하십시오. **Back** 세션 작업 목록으로 돌아갑니다. 제품정보 **Cancel** 그 직업의 세부 사항보기에서, 버튼을 보여줍니다 동안 기다립니다 **Cancelling**, 다음 사용 **Refresh** 확인하기 **Cancelled**... 세부 대화 상자를 닫거나 대화 응답을 종료하는 것은 원격 작업 부하를 취소하지 않습니다.

아래 준비 체크 포인트는이 제어를 통해 취소되었습니다. 원격 프로세스는 독립적으로 확인 된 absent 후. 기존 로그는 readable 남아있다. 이것은 취소 된 분석이 전체 결과를 생성하지 않습니다; 그들을 사용하기 전에 유지 된 파일을 검사합니다.

![선택된 준비 작업에 대한 취소 확인](/img/open-science/remote-compute/09-job-cancelled.webp)


</ToolOperationGroup>

## Slurm을 통해 제출하고 할당을 확인합니다. {/* #submit-through-slurm-and-check-the-allocation */}

1. **Settings → Compute**의 호스트를 열고 **Execution mode → Edit → Slurm → Save**을 선택하고 설정을 다시 열 수 있습니다. **Detected scheduler** 혼자 모드를 선택하지 않습니다.
2. 의도한 대화에서 호스트를 선택하고 선택합니다. 사이트 파티션 / 계정 및 긴 분석을 실행하기 전에 읽을 수있는 스케줄러를 확인합니다.
3. 라인당 하나의 `#SBATCH --option=value` 지시어를 사용하여 리소스를 요청합니다. 이 예제는 다음과 같습니다.

```bash
#SBATCH --partition=local
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --time=00:03:00
```

`local`을 unconditionally 복사하는 것보다 사이트 파티션을 사용하십시오. 작업의 **120-second 워크로드 타임 아웃**은 스케줄러의 3 분 할당 한계에서 분리됩니다. 곧 퀴즈 작업이 시작되는 방법을 결정하지 않습니다. 이 응용 프로그램은 작업 이름, 작업 디렉토리 및 stdout/stderr 경로 관리.

4. 앱 **Job ID** 및 **scheduler_job_id**을 모두 보존합니다. 스케줄러 ID는 초기 제출 영수증 후에 도착할 수 있습니다; 저장된 직업의 상태를 읽는 대리인을 요구하십시오. 첫 번째 영수증이 스케줄러 ID가 부족하기 때문에 다시 제출하지 마십시오.
5. 실제 할당과 관련된 리소스를 비교합니다. 예를 들어 작업과 1 GiB 당 하나의 CPU를 요청했습니다. Slurm는 1개의 작업과 2개의 할당된 논리 CPU를 기록했습니다. 리소스 사용을 설명할 때 스케줄러의 할당 레코드를 사용합니다.
6. 확인 된 터미널 상태 및 수집 된 파일을 기다리고 결과를 게시하기 전에. 서버 측 출력 파일은 응용 프로그램이 수확 한 것을 설정하지 않습니다.

![Slurm은 호스트의 실행 모드에서 명시적으로 선택](/img/open-science/remote-compute/10-slurm-execution-mode.webp)

### 서버가 완료되면 앱이 대기 상태로 유지됩니다. {/* #when-the-server-completes-but-the-app-keeps-waiting */}

앱 스냅샷이 `last_poll_error`을 보고하면 기존의 작업 ID를 유지하고 정확한 오류를 요청합니다. 관찰된 회계 실패는:

```text
slurm_poll_failed: Slurm accounting storage is disabled
```

스케줄러가 **완료 / 종료 코드 0:0**을 보여주면 앱은 **제출하기**, **result_final 거짓** 또는 수집된 파일을 보여 주며 작업 ID를 유지하고 오염 오류를 검사합니다. 치료 스케줄러 완료 및 응용 프로그램 결과 수집 별도의 단계로.

![응용 프로그램은 여전히 완료된 Slurm 작업 부하에 대한 터미널 상태를 기다립니다](/img/open-science/remote-compute/11-slurm-accounting-unavailable.webp)

클러스터 관리자에게 계정과 작업에 대해 `sacct` 회계를 제공하도록 요청하십시오. `squeue`에서 사라지는 작업은 성공을 확인하지 않습니다. 기존의 작업 디렉토리 및 작업 ID 모두 유지, 다음 회계 후 동일한 작업을 새로 고침하고 최종 상태를 확인하고 수집 된 파일을 확인합니다.

<ToolOperationGroup>
<summary>GPU에 작은 단백질 시퀀스 디자인을 실행</summary>

## GPU에 작은 단백질 시퀀스 디자인을 실행 {/* #run-a-small-protein-sequence-design-on-gpu */}

<p className="example-label"><strong>실습 예제</strong> GPU에 ProteinMPNN을 가진 1개의 ubiquitin 순서 디자인하십시오</p>

public [1UBQ ubiquitin 구조](https://www.rcsb.org/structure/1UBQ)을 사용하여 ProteinMPNN과 함께 하나의 체인-A 후보를 생성합니다. 이 검사 원격 GPU 실행 및 출력 검사. 그것은 새로운 구조를 예측하지 않고 ubiquitin 기능을 설정합니다.

1. **Compute**에 연결된 호스트를 선택하십시오. 무료 GPU 메모리와 현재 부하를 확인하고 작은 작업의 직접 실행이 허용된다는 것을 확인합니다. 스케줄러 관리 클러스터에서 공인 파티션 및 계정을 사용하십시오.
2. 고립 된 환경을 준비하고 Python, PyTorch/CUDA 및 의존성 재고를 유지합니다. 예를 들어 Python 3.10, PyTorch 2.5.1+cu124 및 NumPy 1.26.4를 사용했습니다. 호스트의 원래 Python CPU 전용 PyTorch; 혼자 GPU 검출은 충분했습니다.
3. [공식 ProteinMPNN 체크 아웃](https://github.com/dauparas/ProteinMPNN/tree/8907e6671bfbfc92303b5f79c4b5e6ce47cdef57) 및 포함 된 `v_48_020` 무게를 핀. 다운로드 된 1UBQ 구조 및 무게에 대한 SHA-256 기록.
4. 사슬 **₢ 킹**, **1개** 후보자, 배치 크기 **1**의 온도 **0.1**의씨 **42** 및 **180 초** 실행 한계를 지정하십시오. 앱에 의해 표시된 원격 명령을 검사하기 전에 작동을 승인합니다.
5. require stdout/stderr, 출구 상태 및 모형의 모수 장치. `CUDA available=True` 혼자는 방해가 GPU를 사용하지 않습니다. 이 실행은 `parameter_device=cuda:0` 및 `parameter_is_cuda=True`을 기록했습니다.
6. 생성 된 FASTA를 검사합니다. 독립적으로 길이, 아미노산 알파벳, 네이티브 체인과 무한 점수와 일치, 다음 입력 해시를 다시 확인합니다.

| 【특전】 | 이 예에서 결과 |
| --- | --- |
| 제품정보 | NVIDIA A100 80GB PCIe; 모델 매개 변수 실제로 CUDA |
| 입력/출력 길이 | 네이티브 체인 A 및 후보 모두 76 잔류물 |
| 알파벳 및 점수 | 표준 20-amino-acid 알파벳; 0.8568의 무한 점수/글로벌 점수 |
| 네이티브 일치 | 42/76; 독립적으로 recomputed 복구 0.5526316 |
| 회사연혁 | 모델 및 독립적 인 검증 종료 0; 모델-수입 세대 시간 0.1949 초 설정 및 전체 작업을 제외 |
| 입력 무결성 | Identical 구조 SHA-256 전후에 |

<a href="/docs/examples/ubiquitin/gpu-proteinmpnn-verification.json" download>GPU 인증 기록 다운로드</a>. 장치의 80 GB 수용량은 이 작은 일을 위한 최소한도 필요조건이 아닙니다; 피크 메모리는 측정되지 않았습니다. 원격 로그 및 파일은 자동으로 완전한 로컬 Notebook 검증을 제공하지 않습니다.

이 예제는 Direct SSH을 통해 실행됩니다. Slurm GPU 작업의 경우 파티션 및 계정 권한을 먼저 확인합니다. 제출이 **InvalidAccount에 대해**을 반환하면 클러스터 관리자에게 그 설정을 확인하도록 요청하십시오. 스케줄러 관리 작업에 필요한 큐를 사용합니다.


</ToolOperationGroup>

## SSH 및 작업 오류 해결 {/* #resolve-ssh-and-job-errors */}

코드와 메시지를 모두 읽으십시오. 연결 오류, 스케줄러 거부 및 실패 프로그램은 다른 수정이 필요합니다. 아래 식별자는 연결 및 계산 작업 상태를 설명합니다. 인터페이스는 원시 코드 대신 descriptive 메시지를 표시 할 수 있습니다.

### 연결 및 원격 파일 {/* #connection-and-remote-files */}

| 메시지 또는 식별자 | 이름 &#42; | 다음 활동 및 성공 체크 |
| --- | --- | --- |
| `The SSH host key is unknown. Verify it in a terminal before connecting.` | 시스템 SSH 클라이언트는 이 주인과 항구를 위한 믿을 수 있는 열쇠가 없습니다. | 관리자와 지문을 검증, 시스템 SSH 클라이언트에서 호스트 신뢰를 설정, 그 후 다시 **Add** 또는 **Test and save**. 호스트 키 검사를 비활성화하지 마십시오. |
| `Permission denied (publickey)` | SSH 키 인증 실패; 원격 파일 classifier는 이것으로 취급합니다 `connection`. | 사용자, 식별 파일, 호스트 별명 및 ssh-agent를 확인합니다. 관리자가 그 열쇠를 승인한다는 것을 확인하십시오. 제품 정보 **Test and save**, 다음 **Retry probe**. |
| `Connection refused` / `No route to host` / 연결 `timeout` | SSH 수송은 도달하거나 연결을 설정할 수 없습니다. | 호스트, 포트, 네트워크/VPN 및 서버 가용성 확인. 원인을 수정한 후 연결을 다시 합니다. |
| `ENOENT` / `not_found` | 요청된 원격 경로는 존재하지 않습니다. | 원격 호스트의 경로 확인, 당신의 노트북; 올바른 디렉토리 또는 파일을 엽니다. |
| `EACCES` / `EPERM` / `permission` | 연결된 계정은 filesystem 작업을 수행 할 수 없습니다. | 호스트 관리자에게 접근을 확인하거나 공인된 스크래치 디렉토리를 선택하십시오. 동일한 가동을 재기합니다. |
| `outside_roots` | Remote-file 경로 검증은 비결 경로 또는 제어 문자를 거부합니다. | Line breaks/control 문자 없이 절대적인 원격 경로를 공급합니다. 다른 층이 경로를 거부하면 전체 오류를 확인합니다. |

### 작업 기록 {/* #job-records */}

| 오류 코드 | 이름 &#42; | 다음 작업 |
| --- | --- | --- |
| `approval_denied` | 요청된 작업은 승인을받지 못했습니다. | 정의된 명령과 범위를 검토합니다. 새 요청을 제출하면 해당 작업을 승인 할 수 있습니다. |
| `host_unreachable` | 앱은 도달하거나 호스트 작업을 확인 할 수 없습니다. | 연결을 복원하고 호스트를 조사합니다. 제출이 발생하면 재발견 전에 기존의 원격 작업을 확인합니다. |
| `invalid_resources` | 리소스 인수 또는 Slurm 지시어는 유효성 검사를 실패했습니다. | 이름 필드 / 지시를 읽으십시오. 허용되는 리소스 형식, 클러스터 제한 및 모든 앱 관리 지침 제한을 따르십시오. 그 필드를 수정 한 후 재try. |
| `dispatch_failed` | 시작 또는 스케줄러 제출 실패. | stderr 및 모든 읽기 `sbatch` 이름 &#42; 파티션 / 계정, 환경 및 명령을 확인합니다. 다시 제출하기 전에 스케줄러 영수증을 확인합니다. |
| `job_failed` | 작업이 실패했습니다. | 종료 코드를 읽고 stdout/stderr, 프로그램을 수정 또는 환경, 다음 작은 테스트를 실행. |
| `timeout` | 연결, 명령 또는 작업은 제한을 초과; 이 코드는 유효하지 않는 동반 할 수 있습니다. `timeout_seconds`. | elapsed 시간에서 잘못된 입력을 구별하기 위해 동반된 메시지를 사용합니다. 제한 또는 재회를 변경하기 전에 기존 작업 상태를 확인하십시오. |
| `process_vanished` | 추적 또는 복구는 더 이상 예상된 프로세스를 찾을 수 없습니다. | 원격 작업 디렉토리, 로그 및 스케줄러 역사를 검사합니다. 교체 작업 만들기 전에 작업을 중지하거나 완료 여부를 설정하십시오. |

**`last_poll_error` 모니터링 오류**, 작업의 최종 상태 자체에 의해하지. 마찬가지로 `harvest_error`은 결과 수집이 주의해야 합니다. 계산은 이미 완료 될 수 있습니다. 작업 ID를 보존하고 연결성을 복원하고 다른 사본을 시작하기 전에 기존 작업을 검사합니다.

성공적인 복구는 의도한 작업의 최종 상태, 해석 가능한 출구 상태 및 접근 가능한 산출을 표시해야 합니다. Slurm의 경우, 스케줄러 작업 ID뿐만 아니라 앱 작업 ID를 확인하십시오. 오류가 발생하면 [버그를보고 또는 커뮤니티에 요청](troubleshooting.md#report-a-bug-or-ask-the-community)을 따르십시오. 실행 모드를 포함, 사용할 때 ID 모두, 전체 오류 및 위생 로그 발췌.

SSH key/config 인증의 경우, 사용 가능한 키 또는 호스트 별명을 공급하고 제출하기 전에 연결을 확인합니다. Slurm 결과 수집은 선택한 계정에 대해 작업해야합니다. 앱이 작업에 정착할 수 없는 경우 위의 체크를 따르십시오.

소스: [직업 부호 및 기록 분야를 compute](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute.ts), [SSH/file 오류 분류](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/remote-fs.ts), [Slurm 제출 검증](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/compute/slurm-driver.ts).
